"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ParamsPage() {
  const [temperature, setTemperature] = useState("0.7")
  const [maxTokens, setMaxTokens] = useState("150")
  const [model, setModel] = useState("mistral-tiny")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Saving params:", { temperature, maxTokens, model })
    toast({
      title: "AI Parameters updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit AI Parameters</CardTitle>
        <CardDescription>Configure the behavior of the AI model</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              step="0.1"
              min="0"
              max="1"
            />
          </div>
          <div>
            <Label htmlFor="maxTokens">Max Tokens</Label>
            <Input
              id="maxTokens"
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
              min="1"
            />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}

