"use client"

import { useEffect, useState } from "react"
import { SuiClient } from "@mysten/sui/client"
import { useLogin } from "@/contexts/UserContext"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Search, SortDesc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const FULLNODE_URL = process.env.NEXT_PUBLIC_SUI_FULLNODE_URL as string
const packageAddr = process.env.NEXT_PUBLIC_PACKAGE_ADDRESS as string
const NFT_STRUCT_TYPE = `${packageAddr}::coupon_nft::CouponNFT`

interface NFT {
  id: string
  name: string
  description: string
  imageUrl: string
  url?: string
}

export function NFTGallery() {
  const { userDetails } = useLogin()
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    if (!userDetails?.address) return

    const fetchNFTs = async () => {
      setLoading(true)
      try {
        const client = new SuiClient({ url: FULLNODE_URL })

        // First, get all objects owned by the user
        const ownedObjects = await client.getOwnedObjects({
          owner: userDetails.address,
          options: {
            showContent: true,
          },
        })

        // Then filter for our NFT type and parse the data
        const parsedNFTs = ownedObjects.data
          .filter((obj) => {
            const type = obj.data?.type
            return type && type.includes(NFT_STRUCT_TYPE)
          })
          .map((obj) => {
            const fields = obj.data?.content?.fields
            if (!fields) return null

            return {
              id: obj.data?.objectId,
              name: fields.name,
              description: fields.description,
              imageUrl: fields.image_url,
              url: fields.url,
            }
          })
          .filter(Boolean) as NFT[]

        setNfts(parsedNFTs)
      } catch (error) {
        console.error("Error fetching NFTs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNFTs()
  }, [userDetails?.address])

  const filteredNFTs = nfts
    .filter(
      (nft) =>
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
    
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search your coupons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-gray-800 border-gray-700 text-white w-full sm:w-[300px]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortOrder}
            className="border-gray-700 text-gray-300 hover:bg-gray-700"
          >
            <SortDesc className="h-4 w-4 mr-2" />
            {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-gray-700 bg-gray-800/50 overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredNFTs.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <div className="space-y-2">
                  <p className="text-gray-400">No coupons found matching "{searchTerm}"</p>
                  <Button variant="link" onClick={() => setSearchTerm("")} className="text-purple-400">
                    Clear search
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-400 text-lg">You don't have any coupon NFTs yet</p>
                  <p className="text-gray-500">Mint your first coupon to see it here</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNFTs.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="border-gray-700 bg-gray-800/50 overflow-hidden h-full flex flex-col hover:border-purple-500/50 transition-colors group">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={nft.imageUrl || "/placeholder.svg"}
                        alt={nft.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/stack-of-discount-vouchers.png"
                        }}
                      />
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <h3 className="font-semibold text-lg text-white mb-1">{nft.name}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{nft.description}</p>
                    </CardContent>
                    <CardFooter className="px-4 pb-4 pt-0">
                      <div className="flex gap-2 w-full">
                        <a
                          href={`https://explorer.sui.io/object/${nft.id}?network=${process.env.NEXT_PUBLIC_NETWORK || "testnet"}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
                        >
                          View on Explorer
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>

                        {nft.url && (
                          <a
                            href={nft.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-400 hover:text-purple-300 flex items-center ml-auto"
                          >
                            Coupon Details
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
