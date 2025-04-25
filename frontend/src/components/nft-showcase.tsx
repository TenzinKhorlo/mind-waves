import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function NFTShowcase() {
  return (
    <section id="nft-rewards" className="w-full py-12 md:py-24 lg:py-32 bg-black relative">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-lg bg-zinc-800/80 px-3 py-1 text-sm">
              <Sparkles className="mr-1 h-4 w-4" />
              <span>NFT Rewards</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Unique Digital Collectibles</h2>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
              Each NFT represents a meditation achievement, with rarity based on the difficulty of the threshold
              reached.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* NFT Card 1 */}
          <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <CardContent className="p-0">
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-4xl">🧘</span>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm">Beginner</Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Zen Garden</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Achieved by maintaining focused meditation for 5 minutes continuously.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs">Common</span>
                  </div>
                  <div className="text-xs text-zinc-500">Minted: 1,245</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Card 2 */}
          <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <CardContent className="p-0">
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-4xl">✨</span>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 bg-violet-500/80 backdrop-blur-sm">Intermediate</Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Cosmic Consciousness</h3>
                <p className="text-sm text-zinc-400 mb-4">Earned by reaching deep meditation state for 15 minutes.</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Rare</span>
                  </div>
                  <div className="text-xs text-zinc-500">Minted: 423</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NFT Card 3 */}
          <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 hover:border-primary/50 transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <CardContent className="p-0">
              <div className="relative">
                <div className="w-full aspect-square bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-4xl">🔮</span>
                  </div>
                </div>
                <Badge className="absolute top-3 right-3 bg-amber-500/80 backdrop-blur-sm">Advanced</Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enlightenment</h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Legendary achievement for maintaining theta waves for 30+ minutes.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span className="text-xs">Legendary</span>
                  </div>
                  <div className="text-xs text-zinc-500">Minted: 37</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
