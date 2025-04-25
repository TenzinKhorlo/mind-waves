import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function NftCollection() {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>NFT Collection</CardTitle>
        <CardDescription className="text-zinc-400">Your earned meditation rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="earned">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
            <TabsTrigger value="earned">Earned (3)</TabsTrigger>
            <TabsTrigger value="available">Available (4)</TabsTrigger>
          </TabsList>
          <TabsContent value="earned" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300&query=purple meditation nft with brain waves"
                    alt="Mindful Spark NFT"
                    width={300}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Mindful Spark</h3>
                      <p className="text-xs text-zinc-400">Earned on April 21, 2025</p>
                    </div>
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      Common
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
                <div className="aspect-square relative">
                  <Image
                    src="/placeholder.svg?height=300&width=300&query=blue meditation nft with energy waves"
                    alt="Cosmic Calm NFT"
                    width={300}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Cosmic Calm</h3>
                      <p className="text-xs text-zinc-400">Earned on April 22, 2025</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Rare
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-sm text-zinc-400">Continue meditating to earn more NFTs</p>
            </div>
          </TabsContent>
          <TabsContent value="available" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center p-4 border border-zinc-800 rounded-lg bg-zinc-950">
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=64&width=64&query=cyan meditation nft with geometric patterns"
                    alt="Transcendent Mind NFT"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">Transcendent Mind</h3>
                      <p className="text-xs text-zinc-400">Achieve 10 deep meditation sessions</p>
                    </div>
                    <Badge variant="outline" className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      Legendary
                    </Badge>
                  </div>
                  <div className="mt-2 w-full bg-zinc-800 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-cyan-600 h-1.5 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">Progress: 4/10 sessions</p>
                </div>
              </div>
              <div className="text-center py-4">
                <p className="text-sm text-zinc-400">Complete meditation challenges to unlock these rewards</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
