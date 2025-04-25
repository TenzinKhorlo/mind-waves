"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BrainCircuit, ArrowRight } from "lucide-react"
import FeatureSection from "@/components/feature-section"
import HowItWorksSection from "@/components/how-it-works-section"
import NFTShowcase from "@/components/nft-showcase"
import Footer from "@/components/footer"
import { useLogin } from "@/contexts/UserContext"

export default function Home() {
  const { isLoggedIn, logOut } = useLogin()

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl w-full mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MindWave</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white">
              How It Works
            </Link>
            <Link href="#nft-rewards" className="text-sm font-medium text-zinc-400 hover:text-white">
              NFT Rewards
            </Link>
            <Link href="#faq" className="text-sm font-medium text-zinc-400 hover:text-white">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="border-zinc-700 cursor-pointer bg-transparent text-white hover:bg-zinc-800 hover:text-white"
              >
                Dashboard
              </Button>
            </Link>

            {isLoggedIn?(
              <Button size="sm" onClick={logOut} className="rounded-sm cursor-pointer text-white bg-purple-600">
                Log out
              </Button>
            ):(
              <Link href="/login">
              <Button size="sm" className="rounded-sm cursor-pointer text-white bg-purple-600">
                Log in
              </Button>
            </Link>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl w-full mx-auto flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-3xl"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-lg bg-zinc-800/80 px-3 py-1 text-sm">
                  <BrainCircuit className="mr-1 h-4 w-4" />
                  <span>Sui Hackerhouse Competition</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Meditate. <span className="text-purple-600">Achieve</span>. Earn.
                  </h1>
                  <p className="max-w-[600px] text-zinc-400 md:text-xl">
                    Transform your meditation practice with blockchain rewards. Connect your Muse device, achieve
                    mindfulness, and earn unique NFTs on the Sui blockchain.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="rounded-sm gap-2 text-white bg-purple-600">
                      Start Your Journey
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                    >
                      How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <Image
                    src="/mindful-future.png"
                    alt="Person meditating with futuristic brain wave visualization"
                    width={500}
                    height={500}
                    className="rounded-2xl object-cover"
                    priority
                  />
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-medium">Threshold Reached</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-md bg-zinc-700 flex items-center justify-center">
                        <span className="text-xs">NFT</span>
                      </div>
                      <span className="text-xs">NFT Minted!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeatureSection />
        <HowItWorksSection />
        <NFTShowcase />

        <section id="cta" className="py-20 bg-gradient-to-r from-violet-900/20 to-indigo-900/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Meditation Practice?
                </h2>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                  Join the future of mindfulness where your meditation skills earn real rewards on the blockchain.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800 hover:text-white"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section> 
      </main>
      <Footer />
    </div>
  )
}
