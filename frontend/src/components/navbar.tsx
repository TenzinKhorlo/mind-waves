"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrainCircuit, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLogin } from "@/contexts/UserContext"

export function Navbar() {
  const { isLoggedIn, logOut } = useLogin();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            MindWave
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            How It Works
          </Link>
          <Link href="#rewards" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
            Rewards
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="hidden md:flex text-zinc-400 hover:text-white">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          {isLoggedIn ? (<Button
            asChild
            onClick={logOut}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Link href="#">Log out</Link>
          </Button>) : (<Button
            asChild
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            <Link href="/login">Log in</Link>
          </Button>)
          }
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-950 border-zinc-800">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="#features" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  How It Works
                </Link>
                <Link href="#rewards" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                  Rewards
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>

                {isLoggedIn ? (<Button
                  asChild
                  onClick={logOut}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Link href="#">Log out</Link>
                </Button>) : (<Button
                  asChild
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Link href="/login">Log in</Link>
                </Button>)
                }
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
