/* eslint-disable */
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { LayoutDashboard, Loader2, RefreshCcw, Mail, Clock } from "lucide-react"
import mockEmails from "@/lib/emailMock.json"

// Define the Email interface to ensure type safety
export interface Email {
  id: string
  name: string
  email: string
  subject: string
  date: string
  body: string
  read?: boolean
  important?: boolean
  category?: "primary" | "social" | "promotions" | "updates"
  attachments?: boolean
}

// Type assertion for the imported JSON data
const typedMockEmails = mockEmails as unknown as Omit<Email, "id">[]

export function MailboxView() {
  // Add proper typing to the emails state
  const [emails] = useState<Email[]>(() =>
    typedMockEmails.map((email, index) => ({
      ...email,
      id: `email-${index + 1}`,
    })),
  )

  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const router = useRouter()

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

  const handleSummarize = () => {
    // Navigate to the dashboard/swipe view
    router.push("/slidesupport")
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Add timeout to simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Format date for better display - fixed to always return a string
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      const now = new Date()

      // If it's today, show time only
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }

      // If it's this year, show month and day
      if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString([], { month: "short", day: "numeric" })
      }

      // Otherwise show full date
      return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
    } catch (error) {
      // Return a string instead of the error object
      return "Invalid date"
    }
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Mailbox</h1>
          </div>
          <p className="text-sm text-muted-foreground">Showing top {emails.length} emails from your Gmail account</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 transition-all hover:bg-muted/80"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            <span>Refresh</span>
          </Button>
          <Button size="sm" className="h-9 gap-2 shadow-sm transition-all hover:shadow-md" onClick={handleSummarize}>
            <LayoutDashboard className="h-4 w-4" />
            <span>Summarize</span>
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Inbox</CardTitle>
              {selectedEmails.length > 0 && (
                <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                  {selectedEmails.length} selected
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-slate-200 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="w-12">
                    <Checkbox
                      onCheckedChange={(checked) => handleSelectAll(!!checked)}
                      aria-label="Select all"
                      className="transition-all data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                  </TableHead>
                  <TableHead className="font-medium">Sender</TableHead>
                  <TableHead className="font-medium">Subject</TableHead>
                  <TableHead className="hidden font-medium md:table-cell">Preview</TableHead>
                  <TableHead className="w-24 text-right font-medium">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {emails.map((email) => (
                  <TableRow
                    key={email.id}
                    className={`group transition-colors ${
                      selectedEmails.includes(email.id) ? "bg-primary/5" : hoveredRow === email.id ? "bg-slate-50" : ""
                    }`}
                    onMouseEnter={() => setHoveredRow(email.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell className="py-3">
                      <Checkbox
                        checked={selectedEmails.includes(email.id)}
                        onCheckedChange={(checked) => handleSelectEmail(email.id, !!checked)}
                        aria-label={`Select email from ${email.name}`}
                        className="transition-all data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      <div className="truncate max-w-[150px]">{email.name}</div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="font-medium truncate max-w-[200px]">{email.subject}</div>
                    </TableCell>
                    <TableCell className="hidden max-w-xs py-3 text-muted-foreground md:table-cell">
                      <div className="truncate">{email.body}</div>
                    </TableCell>
                    <TableCell className="py-3 text-right text-sm text-muted-foreground">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="h-3 w-3 opacity-70" />
                        <span>{formatDate(email.date)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {emails.length === 0 && (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <div className="space-y-2">
                <Mail className="mx-auto h-8 w-8 text-slate-400" />
                <p className="text-sm font-medium text-slate-600">No emails found</p>
                <p className="text-xs text-slate-500">Refresh to check for new emails</p>
              </div>
            </div>
          )}

          {selectedEmails.length > 0 && (
            <div className="mt-4 flex items-center justify-between rounded-md bg-primary/5 p-2 text-sm">
              <span className="font-medium text-primary">
                {selectedEmails.length} {selectedEmails.length === 1 ? "email" : "emails"} selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEmails([])}
                className="h-7 text-xs hover:bg-primary/10"
              >
                Clear selection
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
