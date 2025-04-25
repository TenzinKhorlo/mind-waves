import Link from "next/link"
import { BrainCircuit, Twitter, Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black py-6 md:py-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} MindWave. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-zinc-400 hover:text-white">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-zinc-400 hover:text-white">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="#" className="text-zinc-400 hover:text-white">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs text-zinc-400 hover:underline underline-offset-4 hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-zinc-400 hover:underline underline-offset-4 hover:text-white">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-zinc-400 hover:underline underline-offset-4 hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
