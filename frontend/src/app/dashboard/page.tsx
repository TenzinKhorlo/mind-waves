"use client"
import { useEffect, useState } from "react"
// import { Navbar } from "@/components/navbar"
// import { Footer } from "@/components/footer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MeditationStats } from "@/components/dashboard/meditation-stats"
import { MeditationSession } from "@/components/dashboard/meditation-session"
import { DataMarketplace } from "@/components/dashboard/data-marketplace"
import { MindfulCoin } from "@/components/dashboard/nft-collection"

export default function DashboardPage() {
  const [txnDigest, setTxnDigest] = useState("");
  
  return (
    <div className="px-4 lg:px-8 flex min-h-screen flex-col bg-black text-white">
      {/* <Navbar /> */}
      <main className="flex-1">
        <DashboardHeader />
        <div className="container py-8 space-y-8">
          {/* <MeditationStats /> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MeditationSession setTxnDigest={setTxnDigest}/>
            <MindfulCoin txnDigest={txnDigest}/>
          </div>
          {/* <DataMarketplace /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  )
}
