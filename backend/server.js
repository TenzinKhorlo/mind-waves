// server.js  –  Muse-2 OSC  ➜  Band-Power JSON  ➜  WebSocket
// ----------------------------------------------------------
require("dotenv").config();
const express   = require("express");
const cors      = require("cors");
const dgram     = require("dgram");
const WebSocket = require("ws");
const { fft }   = require("fft-js");          // Fast Fourier Transform
const parseOSC  = require("./utils/oscHelpers"); // unchanged helper

//------------------------------------------------------------
// Configuration (mirrors your Python constants)
const FS        = 256;                        // Hz
const WIN_LEN   = FS;                         // 1-s window
const CHANNELS  = ["TP9","AF7","AF8","TP10"];
const BANDS     = {                           // [low, high] in Hz
  Delta:[1,4], Theta:[4,8], Alpha:[8,13],
  Beta:[13,30], Gamma:[30,44],
};
const UDP_PORT  = process.env.UDP_PORT    || 5000;
const WS_PORT   = process.env.SOCKET_PORT || 3001;
const HTTP_PORT = process.env.BACKEND_PORT|| 4000;
const SEND_MS   = 1000;

//------------------------------------------------------------
// DSP helpers ------------------------------------------------
const hamming = Array.from({length:WIN_LEN},(_,n)=>
  0.54 - 0.46*Math.cos((2*Math.PI*n)/(WIN_LEN-1)));
const hzPerBin = FS / WIN_LEN;
const bufMean  = a => a.reduce((s,v)=>s+v,0)/a.length;
const psdMag   = (re,im)=> re*re + im*im;

/** Compute average dB band-power across the 4 channels */
function computeBandPower(buffers){
  // 1. window + de-mean
  const windowed = CHANNELS.map((_,ch)=>
    buffers[ch].map((v,i)=>(v - bufMean(buffers[ch]))*hamming[i]));

  // 2. RFFT + PSD per channel
  const spectra = windowed.map(sig=>{
    const spec = fft(sig);                  // complex pairs
    return spec.slice(0, WIN_LEN/2+1)       // positive freqs
               .map(([re,im])=> psdMag(re,im));
  });

  // 3. integrate bands & average channels
  const out = {};
  for(const [band,[lo,hi]] of Object.entries(BANDS)){
    const loBin=Math.ceil(lo/hzPerBin), hiBin=Math.floor(hi/hzPerBin);
    const chPow = spectra.map(arr=>
      arr.slice(loBin,hiBin+1).reduce((s,v)=>s+v,0));
    out[band] = 10*Math.log10(
                  chPow.reduce((s,v)=>s+v,0)/chPow.length + 1e-12);
  }
  return out;
}

//------------------------------------------------------------
// State ------------------------------------------------------
const buffers     = CHANNELS.map(()=>[]);   // rolling 256-sample buffers
let latestACC     = null;
let latestPPG     = null;
let latestSignal  = null;                  // last computed JSON row

//------------------------------------------------------------
// Web servers ------------------------------------------------
const app       = express().use(cors()).use(express.json());
const udp       = dgram.createSocket("udp4");
const wss       = new WebSocket.Server({port:WS_PORT});
const clients   = new Set();

wss.on("connection",ws=>{
  clients.add(ws);
  ws.on("close",()=>clients.delete(ws));
  console.log("⚡ WebSocket client connected");
});

// broadcast every second
setInterval(()=>{
  if(!latestSignal) return;
  const msg = JSON.stringify({address:"/bandpower", signal:latestSignal});
  for(const c of clients) if(c.readyState===WebSocket.OPEN) c.send(msg);
}, SEND_MS);

//------------------------------------------------------------
// UDP / OSC ingest ------------------------------------------
udp.on("message",(packet)=>{
  try{
    const {address,args}=parseOSC(packet);

    if(address==="/eeg" && args.length>=4){
      // push to circular buffers
      args.slice(0,4).forEach((v,i)=>{
        const val = Number.isFinite(v)?v:0;
        const buf = buffers[i]; buf.push(val);
        if(buf.length>WIN_LEN) buf.shift();
      });
      // once 256 samples collected → compute
      if(buffers[0].length===WIN_LEN){
        const bp = computeBandPower(buffers);
        latestSignal = {
          timestamp: new Date().toISOString(),
          ...bp,
          AccX: latestACC?.[0] ?? null,
          AccY: latestACC?.[1] ?? null,
          AccZ: latestACC?.[2] ?? null,
          PPG1: latestPPG?.[0] ?? null,
          PPG2: latestPPG?.[1] ?? null,
          PPG3: latestPPG?.[2] ?? null,
        };
        console.log(`[${new Date().toLocaleTimeString()}]`,
                    "Band powers saved:", latestSignal);
      }
    }
    else if(address==="/acc" && args.length>=3){
      latestACC = args.slice(0,3).map(v=>Number.isFinite(v)?v:0);
    }
    else if(address==="/ppg" && args.length>=3){
      latestPPG = args.slice(0,3).map(v=>Number.isFinite(v)?v:0);
    }
  }catch(e){ console.error("OSC parse error:",e.message); }
});

udp.bind(UDP_PORT,()=>{
  const a=udp.address();
  console.log(`✅ Listening OSC on ${a.address}:${a.port}`);
  console.log(`📡 WebSocket ws://localhost:${WS_PORT}`);
});

//------------------------------------------------------------
// Minimal HTTP endpoints ------------------------------------
app.get("/",(_,res)=>res.send("🧠 Muse EEG band-power server running"));
app.listen(HTTP_PORT,()=>console.log(
  `🌍 HTTP server http://localhost:${HTTP_PORT}`));

