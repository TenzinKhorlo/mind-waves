"use client"

import { BrainCircuit, Sparkles, BarChart3, Coins, Shield, Database } from "lucide-react"
import { useEffect, useState } from "react"

export default function FeatureSection() {
  // Random positions for the light effects
  const [lightPositions, setLightPositions] = useState<
    Array<{ top: string; left: string; size: string; opacity: string }>
  >([])

  useEffect(() => {
    // Generate random positions for the light effects on each card
    const positions = Array(6)
      .fill(0)
      .map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 50 + 100}px`,
        opacity: `${Math.random() * 0.15 + 0.05}`,
      }))
    setLightPositions(positions)
  }, [])

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-black relative">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-lg bg-zinc-800/80 px-3 py-1 text-sm">
              <Sparkles className="mr-1 h-4 w-4" />
              <span>Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Revolutionize Your Meditation Practice
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              MindWave combines cutting-edge neurofeedback technology with blockchain rewards to create a unique
              meditation experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {[
            {
              icon: <BrainCircuit className="h-6 w-6 text-[#8b5cf6]" />,
              title: "Muse Integration",
              description:
                "Seamlessly connect your Muse meditation device to track your brainwave activity in real-time.",
            },
            {
              icon: <BarChart3 className="h-6 w-6 text-[#8b5cf6]" />,
              title: "Real-time Analytics",
              description:
                "Visualize your meditation progress with beautiful, intuitive charts and data visualizations.",
            },
            {
              icon: <Coins className="h-6 w-6 text-[#8b5cf6]" />,
              title: "NFT Rewards",
              description: "Earn unique NFTs on the Sui blockchain when you achieve meditation milestones.",
            },
            {
              icon: <Shield className="h-6 w-6 text-[#8b5cf6]" />,
              title: "Secure zkLogin",
              description: "Access your account securely with zero-knowledge proof authentication.",
            },
            {
              icon: <Database className="h-6 w-6 text-[#8b5cf6]" />,
              title: "Data Marketplace",
              description: "Opt-in to sell your anonymized meditation data for additional NFT rewards.",
            },
            {
              icon: <Sparkles className="h-6 w-6 text-[#8b5cf6]" />,
              title: "Gamified Experience",
              description: "Level up your meditation practice with challenges, achievements, and rewards.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden transition-all duration-300 hover:border-[#8b5cf6]/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              {/* Purple light effect */}
              <div
                className="absolute rounded-full bg-[#8b5cf6] blur-[80px] transition-all duration-700 group-hover:blur-[100px]"
                style={{
                  width: lightPositions[index]?.size || "150px",
                  height: lightPositions[index]?.size || "150px",
                  top: lightPositions[index]?.top || "50%",
                  left: lightPositions[index]?.left || "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: lightPositions[index]?.opacity || "0.1",
                }}
              />

              {/* Card content */}
              <div className="rounded-full bg-[#8b5cf6]/20 p-3 z-10 transition-all duration-300 group-hover:bg-[#8b5cf6]/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold z-10">{feature.title}</h3>
              <p className="text-center text-zinc-400 z-10">{feature.description}</p>

              {/* Subtle border glow */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow: "inset 0 0 20px rgba(139, 92, 246, 0.3)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
