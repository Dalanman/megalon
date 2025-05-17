// app/MailBoxView.tsx
"use client"

import { useEffect, useState } from "react"
import { MailCard } from "@/components/mailCard"
import mockEmails from "@/lib/emailMock.json"

// Define the Email type locally
type Email = {
  name: string
  email: string
  subject: string
  date: string
  body: string
}

export default function MailBoxView() {
  const [emails, setEmails] = useState<Email[]>([])

  useEffect(() => {
    setEmails(mockEmails as Email[])
  }, [])

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Inbox</h1>
      {emails.length === 0 ? (
        <p className="text-gray-500">No emails found.</p>
      ) : (
        emails.map((email, index) => <MailCard key={index} email={email} />)
      )}
    </div>
  )
}
