import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MessageSquare, Bot, FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-foreground">Welcome to Ozdo AI Bot Admin Panel</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Bots</CardTitle>
            <CardDescription>Manage your Ozdo AI Telegram bots</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/my-bots">
              <Button className="w-full">
                <Bot className="mr-2 h-4 w-4" /> Manage Bots
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
            <CardDescription>View and analyze bot activity logs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/logs">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" /> View Logs
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Test Chat</CardTitle>
            <CardDescription>Test your Ozdo AI bot without Telegram</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/chat">
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Open Chat
                <ArrowRight className="ml-auto h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

