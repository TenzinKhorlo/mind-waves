import { ArrowRight } from "lucide-react"
import { BrainCircuit, Coins } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How MindWave Works</h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              A simple process to transform your meditation practice and earn rewards on the blockchain.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl mt-12 relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-12 relative">
            <div className="order-2 md:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center rounded-full bg-primary w-8 h-8 text-primary-foreground font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold">Connect Your Muse Device</h3>
                <p className="text-zinc-400">
                  Login with zkLogin and connect your Muse meditation headband to the MindWave platform.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-12 relative">
            <div className="order-2">
              <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-2xl">🧘</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center rounded-full bg-primary w-8 h-8 text-primary-foreground font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold">Start Your Meditation Session</h3>
                <p className="text-zinc-400">
                  Begin your meditation practice while the app monitors your brainwave activity in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-12 relative">
            <div className="order-2 md:order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center rounded-full bg-primary w-8 h-8 text-primary-foreground font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold">Reach Meditation Thresholds</h3>
                <p className="text-zinc-400">
                  As you achieve deeper states of meditation, the app tracks when you cross predefined thresholds.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-1/2 bg-zinc-800/80 rounded-lg p-4">
                    <div className="h-full w-full flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400">Focus Level</span>
                        <span className="text-xs text-zinc-400">85%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400">Threshold</span>
                        <span className="text-xs text-green-400">Reached!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center relative">
            <div className="order-2">
              <div className="relative w-full max-w-[300px] aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Coins className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center rounded-full bg-primary w-8 h-8 text-primary-foreground font-bold">
                  4
                </div>
                <h3 className="text-2xl font-bold">Earn NFT Rewards</h3>
                <p className="text-zinc-400">
                  When you cross thresholds, smart contracts on the Sui blockchain automatically mint unique NFTs as
                  rewards.
                </p>
              </div>
            </div>
          </div>

          {/* Final arrow */}
          <div className="flex justify-center mt-8">
            <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
          </div>

          {/* Result */}
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold">Continue Your Journey</h3>
            <p className="text-zinc-400 max-w-[700px] mx-auto mt-2">
              Track your progress over time, build your NFT collection, and optionally sell your anonymized data for
              additional rewards while improving your meditation practice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
