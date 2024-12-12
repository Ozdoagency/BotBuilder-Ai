"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "/workspaces/BotBuilder-Ai/hooks/use-toast.ts"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const chatBots = ["Bot 1", "Bot 2", "Bot 3"]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [selectedBot, setSelectedBot] = useState(chatBots[0])
  const { toast } = useToast()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")

    // Здесь должен быть запрос к вашему API для получения ответа от ИИ
    // Для демонстрации используем заглушку
    setTimeout(() => {
      const assistantMessage: Message = { role: 'assistant', content: "Это тестовый ответ от Ozdo AI. В реальном приложении здесь будет ответ от вашей модели." }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  const handleClearChat = () => {
    setMessages([])
    toast({
      title: "Chat cleared",
      description: "The chat has been cleared.",
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test Chat</CardTitle>
        <CardDescription>Test your Ozdo AI bot without connecting to Telegram</CardDescription>
        <div className="mt-4 flex justify-between items-center">
          <Select value={selectedBot} onValueChange={setSelectedBot}>
            <SelectTrigger>
              <SelectValue placeholder="Select a chatbot" />
            </SelectTrigger>
            <SelectContent>
              {chatBots.map((bot) => (
                <SelectItem key={bot} value={bot}>{bot}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleClearChat} className="ml-4">
            Clear Chat
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                message.role === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
              } max-w-[80%] ${message.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
            >
              {message.content}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

