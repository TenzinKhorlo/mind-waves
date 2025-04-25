"use client"

import { useEffect, useState, useRef } from "react"
import { SuiClient } from "@mysten/sui/client"
import { useLogin } from "@/contexts/UserContext"
import { Button } from "@/components/ui/button"
import { RefreshCw, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string

type NFT = {
  id: string
  name: string
  description: string
  imageUrl: string
  url?: string
}

export default function NFTGallery() {
  const { userDetails } = useLogin()
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const fetchNFTs = async () => {
    if (!userDetails?.address) return

    setLoading(true)
    setError(null)

    try {
      const client = new SuiClient({ url: FULLNODE_URL })

      // Fetch all objects and filter client-side to avoid "Invalid params" error
      const allObjects = await client.getOwnedObjects({
        owner: userDetails.address,
        options: {
          showContent: true,
        },
      })

      const parsedNFTs = allObjects.data
        .filter((obj) => {
          const type = obj.data?.type
          return type && type.includes("coupon_nft::CouponNFT")
        })
        .map((obj) => {
          const fields = obj.data?.content?.fields
          if (!fields) return null

          return {
            id: obj.data?.objectId,
            name: fields.name || "Unnamed Coupon",
            description: fields.description || "No description",
            imageUrl: fields.image_url || "/geometric-discount.png",
            url: fields.url || "",
          }
        })
        .filter(Boolean) as NFT[]

      setNfts(parsedNFTs)
    } catch (error) {
      console.error("Error fetching NFTs:", error)
      setError("Failed to load your NFTs. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNFTs()
  }, [userDetails?.address])

  const scrollToNFT = (index: number) => {
    if (scrollContainerRef.current && nfts.length > 0) {
      const newIndex = Math.max(0, Math.min(index, nfts.length - 1))
      setActiveIndex(newIndex)

      const container = scrollContainerRef.current
      const itemWidth = container.scrollWidth / nfts.length
      container.scrollTo({
        left: itemWidth * newIndex,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current && nfts.length > 0) {
      const container = scrollContainerRef.current
      const itemWidth = container.scrollWidth / nfts.length
      const newIndex = Math.round(container.scrollLeft / itemWidth)
      setActiveIndex(newIndex)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-32 h-32">
          <div className="absolute w-full h-full rounded-full border-t-2 border-l-2 border-white animate-spin"></div>
          <div className="absolute w-full h-full rounded-full border-r-2 border-b-2 border-white/20"></div>
        </div>
        <p className="mt-6 text-white/70 font-light">Loading your collection...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <RefreshCw className="h-8 w-8 text-red-300" />
        </div>
        <h3 className="text-xl font-light mb-3">Unable to load collection</h3>
        <p className="text-white/60 mb-6 font-light">{error}</p>
        <Button variant="outline" onClick={fetchNFTs} className="border-white/20 hover:bg-white/10">
          Try Again
        </Button>
      </div>
    )
  }

  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto">
        <div className="relative w-full h-64 mb-8 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 border border-white/10 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border border-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-light mb-3">No NFTs Found</h3>
        <p className="text-white/60 mb-6 font-light">Your collection is empty. Create your first NFT to get started.</p>
        <Button
          className="bg-white text-black hover:bg-white/90"
          onClick={() => document.querySelector('[value="mint"]')?.dispatchEvent(new MouseEvent("click"))}
        >
          Create First NFT
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light">
          Your Collection <span className="text-white/50 ml-2 text-lg">{nfts.length} NFTs</span>
        </h2>
      </div>

      {/* Featured NFT Display */}
      {nfts[activeIndex] && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
          <img
            src={nfts[activeIndex].imageUrl || "/placeholder.svg"}
            alt={nfts[activeIndex].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
            <h3 className="text-3xl font-light mb-2">{nfts[activeIndex].name}</h3>
            <p className="text-white/70 max-w-2xl mb-4">{nfts[activeIndex].description}</p>

            <div className="flex items-center space-x-4">
              {nfts[activeIndex].url && (
                <Button
                  variant="outline"
                  className="border-white/30 bg-black/30 backdrop-blur-sm hover:bg-white/10"
                  onClick={() => window.open(nfts[activeIndex].url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Redeem Coupon
                </Button>
              )}
              <div className="text-white/50 text-sm font-mono">ID: {nfts[activeIndex].id.substring(0, 10)}...</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToNFT(activeIndex - 1)}
          disabled={activeIndex === 0}
          className={cn("rounded-full p-2 hover:bg-white/10", activeIndex === 0 ? "text-white/30" : "text-white")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex items-center space-x-1">
          {nfts.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToNFT(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "bg-white w-4" : "bg-white/30 hover:bg-white/50",
              )}
              aria-label={`View NFT ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => scrollToNFT(activeIndex + 1)}
          disabled={activeIndex === nfts.length - 1}
          className={cn(
            "rounded-full p-2 hover:bg-white/10",
            activeIndex === nfts.length - 1 ? "text-white/30" : "text-white",
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      <div
        className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {nfts.map((nft, index) => (
          <div
            key={nft.id}
            className={cn(
              "flex-shrink-0 w-[200px] cursor-pointer transition-all duration-300",
              index === activeIndex ? "opacity-100 scale-105" : "opacity-60 hover:opacity-80",
            )}
            onClick={() => scrollToNFT(index)}
          >
            <div className="aspect-square overflow-hidden rounded-md mb-2">
              <img src={nft.imageUrl || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="text-sm font-medium truncate">{nft.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
