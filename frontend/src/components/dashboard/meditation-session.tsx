'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Play, Pause, Award } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { useLogin } from '@/contexts/UserContext'
import { SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';

const BANDS = ['Delta', 'Theta', 'Alpha', 'Beta', 'Gamma']
const MAX_POINTS = 1000
const COUNTER_INTERVAL = 5 // seconds
const ABNORMAL_THRESHOLD = 70 // adjust this based on your data's normal range

const packageAddr = process.env.NEXT_PUBLIC_PACKAGE_ADDRESS as string;
const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string;
const mnemonic = process.env.NEXT_PUBLIC_MNEMONIC as string;
const treasuryAddr = process.env.NEXT_PUBLIC_TREASURY_ADDRESS as string;

export function MeditationSession({ setTxnDigest }: { setTxnDigest: (digest: string) => void }) {
  const [isActive, setIsActive] = useState(false)
  const [data, setData] = useState([])
  const [counter, setCounter] = useState(0)
  const [show, setShow] = useState(false)
  const [finalScore, setFinalScore] = useState(0);

  const { userDetails } = useLogin()

  const tickRef = useRef(0)
  const wsRef = useRef(null)
  const timerRef = useRef(null)
  const scoreTimerRef = useRef(null)
  const secondsRef = useRef(0)


  // Start/stop session and counter
  useEffect(() => {
    if (!isActive) {
      // Clear timers when session ends
      if (timerRef.current) clearInterval(timerRef.current)
      if (scoreTimerRef.current) clearInterval(scoreTimerRef.current)
      return
    }

    // WebSocket setup
    const ws = new WebSocket('ws://localhost:3001')
    wsRef.current = ws

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)

        if (msg.signal) {
          const s = msg.signal

          // Check for abnormal values (high peaks)
          const values = [s.Delta, s.Theta, s.Alpha, s.Beta, s.Gamma].filter(v => v !== undefined)
          const hasAbnormalValue = values.some(val => val > ABNORMAL_THRESHOLD)

          if (hasAbnormalValue) {
            console.log('Abnormal value detected, decreasing counter by 1')
            setCounter(prev => Math.max(0, prev - 1))
          }

          const entry = {
            time: `${tickRef.current++}s`,
            Delta: s.Delta || 0,
            Theta: s.Theta || 0,
            Alpha: s.Alpha || 0,
            Beta: s.Beta || 0,
            Gamma: s.Gamma || 0,
          }
          setData((prev) => [...prev.slice(-MAX_POINTS + 1), entry])
        }
      } catch (e) {
        console.error('WebSocket data error:', e)
      }
    }

    ws.onerror = (err) => console.error('WebSocket error:', err)
    ws.onclose = () => console.log('WebSocket closed')

    // Set up interval to increase counter every 10 seconds
    secondsRef.current = 0
    scoreTimerRef.current = setInterval(() => {
      secondsRef.current += 1

      // Every COUNTER_INTERVAL seconds, increase the counter
      if (secondsRef.current % COUNTER_INTERVAL === 0) {
        console.log('10 seconds passed, increasing counter by 1')
        setCounter(prev => prev + 1)
      }
    }, 1000)


    return () => {
      ws.close()
      if (scoreTimerRef.current) clearInterval(scoreTimerRef.current)
    }
  }, [isActive])

  const handleEndSession = () => {
    if (isActive) {
      setIsActive(false)

      // Calculate final score - show 0 if negative
      const score = Math.max(0, counter)
      setFinalScore(score)
      setShow(true)
    } else {
      // Reset counter at start of new session
      setCounter(0)
      secondsRef.current = 0
      tickRef.current = 0
      setData([])
      setIsActive(true)
    }
  }

  const handleClaimReward = async () => {
    setShow(false)
    // Here you could add code to handle the reward claiming
    try {
      const suiClient = new SuiClient({ url: FULLNODE_URL });
      const keypair = Ed25519Keypair.deriveKeypair(mnemonic);

      const address = keypair.getPublicKey().toSuiAddress();
      console.log("👛 Sender wallet address:", address);

      const coins = await suiClient.getCoins({ owner: address, coinType: "0x2::sui::SUI" });

      if (coins.data.length === 0) {
        alert("No SUI tokens available. Please fund your wallet to mint the mind tokens.");
        return;
      }

      const txb = new Transaction();

      console.log(typeof finalScore)
      console.log(typeof userDetails.address)


      txb.moveCall({
        target:
          `${packageAddr}::mind_token::mint`,
        arguments: [
          txb.object(treasuryAddr),
          txb.pure.u64(finalScore),
          txb.pure.address(userDetails.address),
        ],
      });

      const txnRes = await suiClient.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
      });

      if (txnRes?.digest) {
        setTxnDigest(txnRes.digest);
        alert(`${finalScore} Mind Token Redeemed! Digest: ${txnRes.digest}`);
      }
    } catch (err) {
      console.error("Error minting Mind Token", err);
      alert("Token Redeeming failed. Check console.");
    }finally{
      setFinalScore(0);
      console.log(`Claimed reward for score: ${finalScore}`)
    }
    // Reset token count
  }

  return (
    <>
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Meditation Session</CardTitle>
          <CardDescription className="text-zinc-400">
            Band-power signals streamed every second
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Brain-wave Bands</h4>
              <span className="text-xs text-zinc-400">
                Current Score: {counter}
              </span>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#666" hide />
                  <YAxis stroke="#666" />
                  <Tooltip />

                  {/* distinct hues so each band stands out */}
                  <Line type="monotone" dataKey="Delta" stroke="#f43f5e" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Theta" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Alpha" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Beta" stroke="#facc15" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Gamma" stroke="#a855f7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-xs text-zinc-400">
              {BANDS.map((b) => <span key={b}>{b}</span>)}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleEndSession}
            className={`w-full ${isActive
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              } text-white`}
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" /> End Session
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start Session
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Score dialog */}
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="text-center">
          <DialogTitle>Session Score</DialogTitle>
          <div className="py-6">
            <p className="text-5xl font-bold mb-2">{finalScore}</p>
            <p className="text-sm text-zinc-400">
              Your meditation score based on brainwave stability
            </p>
          </div>
          <DialogFooter className="flex justify-center">
            {finalScore > 0 ? (
              <Button
                onClick={handleClaimReward}
                className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white"
              >
                <Award className="mr-2 h-4 w-4" /> Claim Reward
              </Button>
            ) : (
              <Button onClick={() => setShow(false)} variant="outline">
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}