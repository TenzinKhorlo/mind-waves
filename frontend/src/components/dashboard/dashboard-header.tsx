"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings } from "lucide-react"
import { useLogin } from "@/contexts/UserContext"
import { useRouter } from 'next/navigation';


export function DashboardHeader() {
  const router = useRouter();

  const { isLoggedIn, logOut } = useLogin()

  return (
    <section className="border-b border-zinc-800 bg-zinc-950">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-purple-500">
              <AvatarImage src="/placeholder.svg?height=64&width=64&query=abstract profile avatar" alt="User Avatar" />
              <AvatarFallback>LD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Dorji</h1>
              <p className="text-zinc-400">Your meditation journey continues</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            {isLoggedIn ? (
              <Button onClick={logOut} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Log out
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
