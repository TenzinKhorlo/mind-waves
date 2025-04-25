"use client"

import { useLogin } from "@/contexts/UserContext"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  const { isLoggedIn,  login, logOut } = useLogin();
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md p-6 rounded-lg border border-gray-800">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1">MindWave</h1>
          <h2 className="text-2xl font-bold mb-2">Sign in with zkLogin</h2>
          <p className="text-gray-400 text-sm">Secure, private authentication for your meditation journey</p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={login}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Continue with GitHub
          </button>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-transparent text-white border border-gray-700 rounded hover:bg-gray-800 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
            Continue with Twitter
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px bg-gray-700 flex-1"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-700 flex-1"></div>
        </div>

        <button className="w-full px-4 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors mb-6">
          Connect Wallet Directly
        </button>

        <p className="text-center text-gray-500 text-xs">
          By continuing, you agree to our{" "}
          <a href="#" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          .
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="flex items-center justify-center text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
