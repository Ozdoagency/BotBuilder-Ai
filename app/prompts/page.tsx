"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PromptsPage() {
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant.")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Saving prompt:", systemPrompt)
    toast({
      title: "Prompts updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit System Prompt</CardTitle>
        <CardDescription>Customize the behavior of your AI assistant</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="mb-4"
            rows={10}
            placeholder="Enter your system prompt here..."
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}

