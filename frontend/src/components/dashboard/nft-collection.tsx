"use client"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import { SuiClient } from "@mysten/sui/client"
import { useLogin } from "@/contexts/UserContext";

const packageAddr = process.env.NEXT_PUBLIC_PACKAGE_ADDRESS as string;
const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string;

export function MindfulCoin({txnDigest}: {txnDigest: string}) {
  const { userDetails } = useLogin();
  
  const [mindTokenBalance, setMindTokenBalance] = useState(0);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!userDetails?.address || typeof userDetails.address !== 'string') {
        console.warn('Invalid or missing Sui address');
        return;
      }
  
      try {
        const client = new SuiClient({ url: FULLNODE_URL });
        const mindTokenBalance = await client.getBalance({
          owner: userDetails.address,
          coinType: `${packageAddr}::mind_token::MIND_TOKEN`,
        });
        setMindTokenBalance(Number(mindTokenBalance.totalBalance));
      } catch (error) {
        console.error('Failed to fetch Mind Token balance:', error);
      }
    };
  
    fetchBalances();
  }, [userDetails.address, txnDigest]);
  

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Mindful Coin</CardTitle>
        <CardDescription className="text-zinc-400">Your meditation rewards currency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center p-6 border border-zinc-800 rounded-lg bg-zinc-950">
          <div className="relative w-24 h-24 mb-4">
            <Image src="/amethyst-mind.png" alt="Mindful Coin" width={96} height={96} className="object-cover" />
            <div className="absolute -top-2 -right-2">
              <Badge className="bg-purple-500 text-white border-none">FT</Badge>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-1">{mindTokenBalance}</h2>
          <p className="text-zinc-400 text-sm mb-4">Total Mindful Coins</p>
          {/* <div className="w-full bg-zinc-800 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-cyan-600 h-2 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-xs text-zinc-400">Next reward at 1,500 coins</p> */}
        </div>
        <div>
        <p className="text-zinc-400 text-sm mb-4">Transaction Digest: {txnDigest}</p>
        </div>
      </CardContent>
    </Card>
  )
}
