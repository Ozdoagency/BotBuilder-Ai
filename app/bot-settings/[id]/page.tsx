"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "/workspaces/BotBuilder-Ai/hooks/use-toast.ts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bot, Clock, MessageSquare, Settings, Key, Bell, Zap, HelpCircle, Save, PlusCircle, Trash2, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

type FollowUpMessage = {
  delay: number
  type: 'text' | 'ai_prompt'
  content: string
}

type BotSettings = {
  id: string
  name: string
  token: string
  aiProvider: string
  aiApiKey: string
  notificationBotToken: string
  notificationChatId: string
  systemPrompt: string
  temperature: number
  maxTokens: number
  followUp: {
    enabled: boolean
    messages: FollowUpMessage[]
  }
  aiMessageDelay: {
    enabled: boolean
    minDelay: number
    maxDelay: number
  }
}

type LogEntry = {
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
}

const aiProviders = ["Gemini", "Mistral", "ChatGPT", "Claude"]

export default function BotSettingsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [settings, setSettings] = useState<BotSettings>({
    id: "",
    name: "",
    token: "",
    aiProvider: "",
    aiApiKey: "",
    notificationBotToken: "",
    notificationChatId: "",
    systemPrompt: "",
    temperature: 0.7,
    maxTokens: 150,
    followUp: {
      enabled: false,
      messages: [],
    },
    aiMessageDelay: {
      enabled: false,
      minDelay: 1,
      maxDelay: 3,
    },
  })
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API для получения настроек бота
    setSettings({
      id: params.id as string,
      name: "Sample Bot",
      token: "1234567890:ABCDefGhIjKlMnOpQrStUvWxYz",
      aiProvider: "Mistral",
      aiApiKey: "ai_api_key_example",
      notificationBotToken: "5678901234:ZYXwvUTSrQpOnMlKjIhGfEdCbA",
      notificationChatId: "-1001234567890",
      systemPrompt: "You are a helpful assistant.",
      temperature: 0.7,
      maxTokens: 150,
      followUp: {
        enabled: true,
        messages: [
          { delay: 15, type: 'text', content: "Don't forget to complete your task!" },
          { delay: 60, type: 'ai_prompt', content: "Generate a friendly reminder about the task." },
        ],
      },
      aiMessageDelay: {
        enabled: true,
        minDelay: 1,
        maxDelay: 3,
      },
    })

    // Моковые данные для логов
    setLogs([
      { timestamp: "2024-03-15 10:30:00", level: "info", message: "Bot started successfully" },
      { timestamp: "2024-03-15 10:35:12", level: "info", message: "Received message from user" },
      { timestamp: "2024-03-15 10:35:15", level: "warning", message: "API response delayed" },
      { timestamp: "2024-03-15 10:36:00", level: "error", message: "Failed to process user request" },
    ])
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleFollowUpChange = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      followUp: { ...prev.followUp, enabled }
    }))
  }

  const handleFollowUpMessageChange = (index: number, field: keyof FollowUpMessage, value: string | number) => {
    setSettings(prev => {
      const newMessages = [...prev.followUp.messages]
      newMessages[index] = { ...newMessages[index], [field]: value }
      return { ...prev, followUp: { ...prev.followUp, messages: newMessages } }
    })
  }

  const addFollowUpMessage = () => {
    setSettings(prev => ({
      ...prev,
      followUp: {
        ...prev.followUp,
        messages: [...prev.followUp.messages, { delay: 15, type: 'text', content: '' }]
      }
    }))
  }

  const removeFollowUpMessage = (index: number) => {
    setSettings(prev => ({
      ...prev,
      followUp: {
        ...prev.followUp,
        messages: prev.followUp.messages.filter((_, i) => i !== index)
      }
    }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleAiMessageDelayChange = (field: keyof BotSettings['aiMessageDelay'], value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      aiMessageDelay: { ...prev.aiMessageDelay, [field]: value }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // В реальном приложении здесь был бы запрос к API для сохранения настроек
    console.log("Saving settings:", settings)
    toast({
      title: "Settings updated",
      description: "Your bot settings have been saved successfully.",
    })
  }

  const renderTooltip = (content: string, children: React.ReactNode) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <Tabs defaultValue="general" className="w-full space-y-6 animate-fade-in">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-4 gap-2 px-2">
        <TabsTrigger value="general" className="flex items-center"><Settings className="w-4 h-4 mr-2" /> General</TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center"><Bot className="w-4 h-4 mr-2" /> AI</TabsTrigger>
        <TabsTrigger value="followup" className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Follow-up</TabsTrigger>
        <TabsTrigger value="delay" className="flex items-center"><Clock className="w-4 h-4 mr-2" /> AI Delay</TabsTrigger>
        <TabsTrigger value="logs" className="flex items-center"><MessageSquare className="w-4 h-4 mr-2" /> Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Settings className="w-5 h-5 mr-2 text-primary" /> General Settings
            </CardTitle>
            <CardDescription>Manage your bot's basic information and connections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="name">Bot Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="token">Bot Token</Label>
                <Input
                  id="token"
                  name="token"
                  type="text"
                  value={settings.token}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="aiProvider">AI Provider</Label>
                <Select value={settings.aiProvider} onValueChange={handleSelectChange('aiProvider')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiProviders.map((provider) => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label htmlFor="aiApiKey">AI API Key</Label>
                <Input
                  id="aiApiKey"
                  name="aiApiKey"
                  type="password"
                  value={settings.aiApiKey}
                  onChange={handleChange}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:shadow-md mt-6">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bell className="w-5 h-5 mr-2 text-primary" /> Notifications
            </CardTitle>
            <CardDescription>Configure your notification bot and API token</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label htmlFor="notificationBotToken">Notification Bot Token</Label>
              <Input
                id="notificationBotToken"
                name="notificationBotToken"
                type="text"
                value={settings.notificationBotToken}
                onChange={handleChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="notificationChatId">Notification Chat ID</Label>
              <Input
                id="notificationChatId"
                name="notificationChatId"
                type="text"
                value={settings.notificationChatId}
                onChange={handleChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bot className="w-5 h-5 mr-2 text-primary" /> AI Settings
            </CardTitle>
            <CardDescription>Configure your bot's AI parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">System Prompt</Label>
              <Textarea
                id="systemPrompt"
                name="systemPrompt"
                value={settings.systemPrompt}
                onChange={handleChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                name="temperature"
                type="number"
                value={settings.temperature}
                onChange={handleChange}
                step="0.1"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxTokens">Max Tokens</Label>
              <Input
                id="maxTokens"
                name="maxTokens"
                type="number"
                value={settings.maxTokens}
                onChange={handleChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="followup">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Clock className="w-5 h-5 mr-2 text-primary" /> Follow-up Messages
            </CardTitle>
            <CardDescription>Set up automated follow-up messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="followup-enabled"
                checked={settings.followUp.enabled}
                onCheckedChange={handleFollowUpChange}
              />
              <Label htmlFor="followup-enabled">Enable Follow-up Messages</Label>
            </div>
            <div className={cn("space-y-4", settings.followUp.enabled ? "animate-slide-in" : "hidden")}>
              {settings.followUp.messages.map((message, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex space-x-2 w-full">
                    <Input type="number" value={message.delay} onChange={(e) => handleFollowUpMessageChange(index, 'delay', parseInt(e.target.value))} className="w-20" />
                    <Select value={message.type} onValueChange={(value) => handleFollowUpMessageChange(index, 'type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="ai_prompt">AI Prompt</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea value={message.content} onChange={(e) => handleFollowUpMessageChange(index, 'content', e.target.value)} className="w-full" />
                  </div>
                  <Button variant="ghost" onClick={() => removeFollowUpMessage(index)} className="p-0">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addFollowUpMessage} className="w-full">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Follow-up Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="delay">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center"><Clock className="w-5 h-5 mr-2" /> AI Message Delay Settings</CardTitle>
            <CardDescription>Configure dynamic delays for AI messages to simulate more natural conversation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="ai-delay-enabled"
                checked={settings.aiMessageDelay.enabled}
                onCheckedChange={(checked) => handleAiMessageDelayChange('enabled', checked)}
              />
              <Label htmlFor="ai-delay-enabled">Enable AI Message Delays</Label>
            </div>
            {settings.aiMessageDelay.enabled && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="min-delay">Minimum Delay (seconds)</Label>
                  <Input
                    id="min-delay"
                    type="number"
                    value={settings.aiMessageDelay.minDelay}
                    onChange={(e) => handleAiMessageDelayChange('minDelay', parseInt(e.target.value))}
                    min="0"
                    step="1"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-delay">Maximum Delay (seconds)</Label>
                  <Input
                    id="max-delay"
                    type="number"
                    value={settings.aiMessageDelay.maxDelay}
                    onChange={(e) => handleAiMessageDelayChange('maxDelay', parseInt(e.target.value))}
                    min={settings.aiMessageDelay.minDelay}
                    step="1"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="logs">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><MessageSquare className="w-5 h-5 mr-2" /> Logs</CardTitle>
            <CardDescription>View recent bot activity logs</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {logs.map((log) => (
                  <li key={log.timestamp} className={`flex items-center justify-between ${log.level === 'error' ? 'text-red-500' : log.level === 'warning' ? 'text-yellow-500' : 'text-gray-700'}`}>
                    <span>{log.timestamp} - {log.message}</span>
                    <span className="font-mono">{log.level}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </TabsContent>
      <Button onClick={handleSubmit} className="w-full mt-6 transition-all duration-200 hover:shadow-md">
        <Save className="w-4 h-4 mr-2" /> Save All Changes
      </Button>
    </Tabs>
  )
}

