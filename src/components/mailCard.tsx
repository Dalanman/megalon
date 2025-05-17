// components/MailCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MailCard({ email }: { email: any }) {
  const date = new Date(email.date).toLocaleString()

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{email.subject}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>From:</strong> {email.name} ({email.email})</p>
        <p><strong>Date:</strong> {date}</p>
        <p className="mt-2 text-gray-700">{email.body}</p>
      </CardContent>
    </Card>
  )
}
