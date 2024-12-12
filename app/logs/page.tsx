"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

type LogEntry = {
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    // Здесь вы бы обычно делали запрос к API для получения логов
    // Для демонстрации мы используем моковые данные
    const mockLogs: LogEntry[] = [
      { timestamp: "2024-03-15 10:30:00", level: "info", message: "Bot started successfully" },
      { timestamp: "2024-03-15 10:35:12", level: "info", message: "Received message from user" },
      { timestamp: "2024-03-15 10:35:15", level: "warning", message: "API response delayed" },
      { timestamp: "2024-03-15 10:36:00", level: "error", message: "Failed to process user request" },
    ]
    setLogs(mockLogs)
  }, [])

  const refreshLogs = () => {
    // Здесь вы бы обновляли логи с сервера
    console.log("Refreshing logs...")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={refreshLogs} className="mb-4">Refresh Logs</Button>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {logs.map((log, index) => (
            <div key={index} className={`mb-2 p-2 rounded ${
              log.level === "error" ? "bg-red-100 text-red-800" :
              log.level === "warning" ? "bg-yellow-100 text-yellow-800" :
              "bg-blue-100 text-blue-800"
            }`}>
              <span className="font-bold">{log.timestamp}</span> - {log.message}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

