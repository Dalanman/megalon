"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { ArrowDownAZ, Filter, LayoutDashboard, Loader2, RefreshCcw, Search, Tags } from "lucide-react"
import mockEmails from "@/lib/emailMock.json"

export function MailboxView() {
  const [emails, setEmails] = useState(mockEmails)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [isClassifying, setIsClassifying] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmails(emails.map((email) => email.id))
    } else {
      setSelectedEmails([])
    }
  }

  const handleSelectEmail = (emailId: string, checked: boolean) => {
    if (checked) {
      setSelectedEmails([...selectedEmails, emailId])
    } else {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId))
    }
  }

  const handleClassify = () => {
    setIsClassifying(true)

    // Simulate API call
    setTimeout(() => {
      setIsClassifying(false)
      toast({
        title: "Emails Classified",
        description: `${selectedEmails.length > 0 ? selectedEmails.length : "All"} emails have been classified using your tags.`,
      })
    }, 2000)
  }

  const handleSummarize = () => {
    // Navigate to the dashboard/swipe view
    router.push("/dashboard")
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate fetching new emails
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Mailbox Refreshed",
        description: "Your emails have been updated.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mailbox</h1>
          <p className="text-sm text-muted-foreground">Showing top 50 emails from your Gmail account</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="gap-2" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            Refresh
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleClassify} disabled={isClassifying}>
            {isClassifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tags className="h-4 w-4" />}
            Classify
          </Button>
          <Button className="gap-2" onClick={handleSummarize}>
            <LayoutDashboard className="h-4 w-4" />
            Summarize
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Inbox</CardTitle>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search emails..." className="pl-8" />
            </div>
          </div>
          <CardDescription>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <ArrowDownAZ className="h-3.5 w-3.5" />
                Sort
              </Button>
              <Badge variant="outline" className="rounded-sm px-1 font-normal">
                Unread: 12
              </Badge>
              <Badge variant="outline" className="rounded-sm px-1 font-normal">
                Important: 5
              </Badge>
              <Badge variant="outline" className="rounded-sm px-1 font-normal">
                Selected: {selectedEmails.length}
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox onCheckedChange={(checked) => handleSelectAll(!!checked)} aria-label="Select all" />
                  </TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="hidden md:table-cell">Preview</TableHead>
                  <TableHead className="w-24 text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((email) => (
                  <TableRow key={email.id} className="font-medium">
                    <TableCell>
                      <Checkbox
                        checked={selectedEmails.includes(email.id)}
                        onCheckedChange={(checked) => handleSelectEmail(email.id, !!checked)}
                        aria-label={`Select email from ${email.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{email.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {email.subject}
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                      {email.body}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">{email.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
