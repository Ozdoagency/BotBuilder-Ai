"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Settings, Trash2, Bot } from 'lucide-react'
import Link from "next/link"

type Bot = {
  id: string
  name: string
  token: string
}

export default function MyBotsPage() {
  const [bots, setBots] = useState<Bot[]>([
    { id: "1", name: "Main Bot", token: "1234567890:ABCDefGhIjKlMnOpQrStUvWxYz" },
    { id: "2", name: "Test Bot", token: "0987654321:ZyXwVuTsRqPoNmLkJiHgFeDcBa" },
    { id: "3", name: "Support Bot", token: "1357924680:QwErTyUiOpAsDfGhJkLzXcVbNm" },
  ])
  const [newBotName, setNewBotName] = useState("")
  const [newBotToken, setNewBotToken] = useState("")

  const addBot = () => {
    if (newBotName && newBotToken) {
      const newBot: Bot = {
        id: Date.now().toString(),
        name: newBotName,
        token: newBotToken,
      }
      setBots([...bots, newBot])
      setNewBotName("")
      setNewBotToken("")
    }
  }

  const deleteBot = (id: string) => {
    setBots(bots.filter(bot => bot.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Bot className="mr-2 h-6 w-6 text-primary" />
            My Bots
          </CardTitle>
          <CardDescription>Manage your Ozdo AI Telegram bots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bots.map((bot, index) => (
              <Card key={bot.id} className="flex flex-col justify-between animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <CardTitle>{bot.name}</CardTitle>
                  <CardDescription className="truncate">Token: {bot.token}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Link href={`/bot-settings/${bot.id}`} className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full transition-all duration-200 hover:shadow-md">
                      <Settings className="mr-2 h-4 w-4" /> Settings
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full sm:w-auto transition-all duration-200 hover:shadow-md" onClick={() => deleteBot(bot.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="animate-slide-in" style={{animationDelay: '0.3s'}}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PlusCircle className="mr-2 h-5 w-5 text-primary" />
            Add New Bot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newBotName}
                onChange={(e) => setNewBotName(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="token">Token</Label>
              <Input
                id="token"
                value={newBotToken}
                onChange={(e) => setNewBotToken(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={addBot} className="w-full sm:w-auto transition-all duration-200 hover:shadow-md">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Bot
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

