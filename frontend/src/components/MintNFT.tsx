"use client"

import type React from "react"

import { useState } from "react"
import { useLogin } from "@/contexts/UserContext"
import { SuiClient } from "@mysten/sui/client"
import { Transaction } from "@mysten/sui/transactions"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string
const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC as string
const packageAddr = process.env.NEXT_PUBLIC_PACKAGE_ADDRESS as string

export function MintNFTForm() {
  const { userDetails } = useLogin()
  // const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [txnDigest, setTxnDigest] = useState("")
  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    url: "",
    imageUrl: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewMode, setPreviewMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNftData({ ...nftData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!nftData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!nftData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!nftData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required"
    } else if (!isValidUrl(nftData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL"
    }

    if (nftData.url && !isValidUrl(nftData.url)) {
      newErrors.url = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleNFTMint = async () => {
    if (!validateForm()) return

    try {
      setLoading(true)
      const suiClient = new SuiClient({ url: FULLNODE_URL })
      const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC)

      const address = keypair.getPublicKey().toSuiAddress()
      console.log("👛 Sender wallet address:", address)

      const coins = await suiClient.getCoins({ owner: address, coinType: "0x2::sui::SUI" })

      if (coins.data.length === 0) {
        // toast({
        //   title: "Minting Failed",
        //   description: "No SUI tokens available. Please fund your wallet to mint the NFT.",
        //   variant: "destructive",
        // })
        return
      }

      const txb = new Transaction()

      txb.moveCall({
        target: `${packageAddr}::coupon_nft::mint_to_address`,
        arguments: [
          txb.pure.string(nftData.name),
          txb.pure.string(nftData.description),
          txb.pure.string(nftData.url),
          txb.pure.string(nftData.imageUrl),
          txb.pure.address(userDetails.address),
        ],
      })

      const txnRes = await suiClient.signAndExecuteTransaction({
        signer: keypair,
        transaction: txb,
      })

      if (txnRes?.digest) {
        setTxnDigest(txnRes.digest)
        // toast({
        //   title: "NFT Minted Successfully!",
        //   description: `Transaction digest: ${txnRes.digest.slice(0, 10)}...${txnRes.digest.slice(-6)}`,
        //   variant: "default",
        // })
      }
    } catch (err) {
      console.error("Error minting NFT:", err)
      // toast({
      //   title: "Minting Failed",
      //   description: "There was an error minting your NFT. Please try again.",
      //   variant: "destructive",
      // })
    } finally {
      setLoading(false)
      setNftData({
        name: "",
        description: "",
        url: "",
        imageUrl: "",
      })
      setPreviewMode(false)
    }
  }

  const togglePreview = () => {
    if (!previewMode && !validateForm()) return
    setPreviewMode(!previewMode)
  }

  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-300">Create Coupon NFT</CardTitle>
          <CardDescription className="text-gray-400">
            Fill in the details to mint your coupon as an NFT on the Sui blockchain
          </CardDescription>
        </CardHeader>

        <CardContent>
          {previewMode ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border border-gray-700 shadow-xl">
                {nftData.imageUrl && (
                  <img
                    src={nftData.imageUrl || "/placeholder.svg"}
                    alt={nftData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/stack-of-discount-vouchers.png"
                    }}
                  />
                )}
              </div>

              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold text-white">{nftData.name}</h3>
                <p className="text-gray-300">{nftData.description}</p>
                {nftData.url && (
                  <a
                    href={nftData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-sm underline"
                  >
                    View Coupon Details
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Coupon Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={nftData.name}
                  onChange={handleInputChange}
                  placeholder="Enter coupon name"
                  className={`bg-gray-700 border-gray-600 text-white ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={nftData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your coupon"
                  className={`bg-gray-700 border-gray-600 text-white min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="url" className="text-gray-300">
                  Coupon URL (Optional)
                </Label>
                <Input
                  id="url"
                  name="url"
                  value={nftData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/coupon"
                  className={`bg-gray-700 border-gray-600 text-white ${errors.url ? "border-red-500" : ""}`}
                />
                {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-gray-300">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={nftData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className={`bg-gray-700 border-gray-600 text-white ${errors.imageUrl ? "border-red-500" : ""}`}
                />
                {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            onClick={togglePreview}
            className="w-full sm:w-auto border-purple-500 text-purple-300 hover:bg-purple-900/20"
            disabled={loading}
          >
            {previewMode ? "Edit Details" : "Preview NFT"}
          </Button>

          <Button
            onClick={handleNFTMint}
            disabled={loading}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting...
              </>
            ) : (
              "Mint Coupon NFT"
            )}
          </Button>
        </CardFooter>
      </Card>

      {txnDigest && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/70 border border-green-500/30 rounded-lg p-4 flex items-start gap-3"
        >
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-400">Transaction Successful</h4>
            <p className="text-sm text-gray-300 mt-1">
              Transaction Digest: <span className="font-mono text-xs">{txnDigest}</span>
            </p>
            <a
              href={`https://explorer.sui.io/txblock/${txnDigest}?network=${process.env.NEXT_PUBLIC_NETWORK || "testnet"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block"
            >
              View on Sui Explorer
            </a>
          </div>
        </motion.div>
      )}
    </div>
  )
}
