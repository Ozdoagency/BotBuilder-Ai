"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TokensPage() {
  const [telegramToken, setTelegramToken] = useState("")
  const [notificationToken, setNotificationToken] = useState("")
  const [mistralApiKey, setMistralApiKey] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Saving tokens:", { telegramToken, notificationToken, mistralApiKey })
    toast({
      title: "Tokens and Keys updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Tokens and Keys</CardTitle>
        <CardDescription>Manage API tokens and keys for your bot</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="telegramToken">Telegram Bot Token</Label>
            <Input
              id="telegramToken"
              type="password"
              value={telegramToken}
              onChange={(e) => setTelegramToken(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="notificationToken">Notification Bot Token</Label>
            <Input
              id="notificationToken"
              type="password"
              value={notificationToken}
              onChange={(e) => setNotificationToken(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="mistralApiKey">Mistral API Key</Label>
            <Input
              id="mistralApiKey"
              type="password"
              value={mistralApiKey}
              onChange={(e) => setMistralApiKey(e.target.value)}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}

