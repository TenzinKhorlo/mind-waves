"use client"

import type React from "react"

import { useState } from "react"
import { useLogin } from "@/contexts/UserContext"
import { SuiClient } from "@mysten/sui/client"
import { Transaction } from "@mysten/sui/transactions"
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string
const MNEMONIC = process.env.NEXT_PUBLIC_MNEMONIC as string
const packageAddr = process.env.NEXT_PUBLIC_PACKAGE_ADDRESS as string

export default function MintNFTForm() {
  const { userDetails } = useLogin()

  const [loading, setLoading] = useState(false)
  const [txnDigest, setTxnDigest] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    url: "",
    imageUrl: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNftData({ ...nftData, [e.target.name]: e.target.value })
    // Reset states when form changes
    setError("")
    setSuccess(false)
    setTxnDigest("")
  }

  const isFormValid = () => {
    return nftData.name && nftData.description && nftData.imageUrl
  }

  const handleNFTMint = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess(false)

      const suiClient = new SuiClient({ url: FULLNODE_URL })
      const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC)

      const address = keypair.getPublicKey().toSuiAddress()
      console.log("👛 Sender wallet address:", address)

      const coins = await suiClient.getCoins({ owner: address, coinType: "0x2::sui::SUI" })

      if (coins.data.length === 0) {
        setError("No SUI tokens available. Please fund your wallet to mint the NFT.")
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
        setSuccess(true)
      }
    } catch (err) {
      console.error("Error minting NFT:", err)
      setError("Minting failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setNftData({
      name: "",
      description: "",
      url: "",
      imageUrl: "",
    })
    setTxnDigest("")
    setSuccess(false)
    setError("")
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <h2 className="text-2xl font-light">Create Your Coupon NFT</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/70 font-light">
              Coupon Name
            </Label>
            <Input
              id="name"
              name="name"
              value={nftData.name}
              onChange={handleInputChange}
              placeholder="Enter a name for your coupon"
              className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white/70 font-light">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={nftData.description}
              onChange={handleInputChange}
              placeholder="Describe what this coupon offers"
              className="bg-white/5 border-white/10 text-white min-h-[120px] focus:border-white/30 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-white/70 font-light">
              Redemption URL (Optional)
            </Label>
            <Input
              id="url"
              name="url"
              value={nftData.url}
              onChange={handleInputChange}
              placeholder="https://example.com/redeem"
              className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white/70 font-light">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={nftData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-0"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleNFTMint}
              disabled={loading || !isFormValid()}
              className="bg-white text-black hover:bg-white/90 flex-1"
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

            {(success || error) && (
              <Button variant="outline" onClick={resetForm} className="border-white/20 text-white hover:bg-white/10">
                Reset
              </Button>
            )}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border-red-800 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-900/20 border-green-800 text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your NFT has been minted successfully.
              <div className="mt-2 text-xs font-mono break-all">Transaction: {txnDigest}</div>
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-light mb-6">NFT Preview</h3>
        <div className="border border-white/10 rounded-lg overflow-hidden flex-1 bg-white/5">
          <div className="relative aspect-square bg-black flex items-center justify-center">
            {nftData.imageUrl ? (
              <img
                src={nftData.imageUrl || "/placeholder.svg"}
                alt={nftData.name || "NFT Preview"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white/40 text-center p-6">
                <div className="w-24 h-24 rounded-full border border-white/20 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/30"></div>
                </div>
                <p className="font-light">Enter an image URL to see preview</p>
              </div>
            )}
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-light mb-2">{nftData.name || "Untitled Coupon"}</h3>
            <p className="text-white/60 mb-4 flex-1 font-light">{nftData.description || "No description provided"}</p>
            {nftData.url && (
              <div className="text-sm text-white/60 truncate">
                <span className="font-medium">Redemption URL:</span> {nftData.url}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
