import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, Info } from "lucide-react"

export function DataMarketplace() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Data Marketplace</h2>
        <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
          Beta Feature
        </Badge>
      </div>
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle>Monetize Your Meditation Data</CardTitle>
          <CardDescription className="text-zinc-400">
            Opt-in to share anonymized meditation data and earn additional NFT rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <h3 className="text-base font-medium">Data Sharing</h3>
                  <Button variant="ghost" size="icon" className="ml-1 h-4 w-4 text-zinc-400">
                    <Info className="h-3 w-3" />
                    <span className="sr-only">Info</span>
                  </Button>
                </div>
                <p className="text-sm text-zinc-400">Allow researchers to access your anonymized meditation data</p>
              </div>
              <Switch id="data-sharing" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Basic Package</CardTitle>
                    <Lock className="h-4 w-4 text-zinc-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">1 NFT</div>
                    <p className="text-xs text-zinc-400">Share basic meditation metrics</p>
                    <Button
                      variant="outline"
                      className="w-full mt-2 border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-purple-800/30 bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
                <div className="absolute -top-6 -right-6 h-12 w-24 bg-gradient-to-r from-purple-600 to-blue-600 rotate-45"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Premium Package</CardTitle>
                    <Unlock className="h-4 w-4 text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">3 NFTs</div>
                    <p className="text-xs text-zinc-400">Share detailed brainwave patterns</p>
                    <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">Research Package</CardTitle>
                    <Lock className="h-4 w-4 text-zinc-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">5 NFTs</div>
                    <p className="text-xs text-zinc-400">Share complete meditation sessions</p>
                    <Button
                      variant="outline"
                      className="w-full mt-2 border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
                    >
                      Select
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-950">
              <h3 className="font-medium mb-2">How Data Sharing Works</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Your meditation data is anonymized and encrypted</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Researchers can purchase access through the Sui marketplace</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Smart contracts automatically mint NFT rewards when your data is used</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>You maintain ownership and can revoke access at any time</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
