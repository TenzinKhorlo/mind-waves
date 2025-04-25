"use client"
import { useLogin } from "@/contexts/UserContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MintNFTForm } from "@/components/MintNFT"
import { NFTGallery } from "@/components/NFTGallery"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, Wallet } from "lucide-react"
import { motion } from "framer-motion"

export default function HomePage() {
  const { isLoggedIn, userDetails, login, logOut } = useLogin()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Wallet className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              NFT Coupon Platform
            </h1>
          </motion.div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <span className="text-gray-300 text-sm">
                  Wallet:{" "}
                  <span className="font-mono text-purple-300">
                    {userDetails.address.slice(0, 6)}...{userDetails.address.slice(-4)}
                  </span>
                </span>
              </div>
              <Button
                variant="outline"
                onClick={logOut}
                className="border-purple-500 text-purple-300 hover:bg-purple-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                onClick={login}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign in with Google
              </Button>
            </motion.div>
          )}
        </div>
      </header>

      <main className="container mx-auto py-4 px-4">
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center space-y-6 py-12"
          >
            <h2 className="text-4xl font-bold">Create and Collect Digital Coupons</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Mint unique coupon NFTs on the Sui blockchain and manage your collection in one place.
            </p>
            <div className="pt-4">
              <Button
                onClick={login}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Connect Wallet to Get Started
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Tabs defaultValue="mint" className="max-w-7xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="mint">Mint New Coupon</TabsTrigger>
                <TabsTrigger value="gallery">My Collection</TabsTrigger>
              </TabsList>

              <TabsContent value="mint" className="space-y-4">
                <MintNFTForm />
              </TabsContent>

              <TabsContent value="gallery">
                <NFTGallery />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </main>
    </div>
  )
}
