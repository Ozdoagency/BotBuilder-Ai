"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '../components/ui/toaster'
import Link from 'next/link'
import { Button } from '../components/ui/button'
import { useState } from 'react'
import { Menu, X, Bot } from 'lucide-react'
import { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen bg-background md:flex-row">
          {/* Mobile header */}
          <header className="md:hidden bg-primary text-primary-foreground p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold flex items-center">
              <Bot className="mr-2 h-6 w-6 animate-pulse" />
              Ozdo AI
            </h1>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="transition-transform duration-200 ease-in-out hover:rotate-180">
              {isSidebarOpen ? <X /> : <Menu />}
            </Button>
          </header>

          {/* Sidebar */}
          <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-primary text-primary-foreground p-6 flex flex-col animate-fade-in`}>
            <h1 className="text-2xl font-bold mb-6 hidden md:flex md:items-center">
              <Bot className="mr-2 h-8 w-8 animate-pulse" />
              Ozdo AI
            </h1>
            <nav className="space-y-2 flex-grow">
              <Link href="/my-bots"><Button variant="ghost" className="w-full justify-start hover:translate-x-1 transition-transform duration-200">My Bots</Button></Link>
              <Link href="/logs"><Button variant="ghost" className="w-full justify-start hover:translate-x-1 transition-transform duration-200">Logs</Button></Link>
              <Link href="/chat"><Button variant="ghost" className="w-full justify-start hover:translate-x-1 transition-transform duration-200">Chat</Button></Link>
            </nav>
            <Button variant="secondary" className="mt-auto w-full text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors duration-200">
              Reload Bot Configuration
            </Button>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

