// components/MailCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MailCard({ email }: { email: any }) {
  const date = new Date(email.date).toLocaleString()

  return (
    <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {email.subject}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-800 space-y-2">
        <div>
          <span className="font-medium text-gray-600">From: </span>
          {email.name}{" "}
          <span className="text-gray-500 font-mono text-xs">({email.email})</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Date: </span>
          <span className="text-gray-500">{date}</span>
        </div>
        <hr className="my-2 border-gray-200" />
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{email.body}</p>
      </CardContent>
    </Card>
  )
}
