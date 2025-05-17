"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Define a type for response options
interface ResponseOption {
  response: string
}

interface SlideCardProps {
  email: {
    email_id: string
    from: string
    subject: string
  }
  summary: {
    summary: string[]
    urgency: string
    suggestedResponse?: string
    generated: boolean
    displayresponse: boolean
    // Fix the type of generatedresponse to match its usage
    generatedresponse?: {
      response_options: ResponseOption[]
    }
  }
  onAccept: () => void
  onReject: () => void
}

export const SlideCard: React.FC<SlideCardProps> = ({ email, summary, onAccept, onReject }) => {
  // Update the type to handle more than just A and B
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  // Update the function to accept any string
  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  const handleAccept = () => {
    onAccept()
    setSelectedOption(null)
  }

  const handleReject = () => {
    onReject()
    setSelectedOption(null)
  }

  // Helper function to determine urgency class safely
  const getUrgencyClass = (urgency: string): string => {
    const urgencyLower = urgency.toLowerCase()
    if (urgencyLower.includes("high")) {
      return "bg-red-100 text-red-800"
    } else if (urgencyLower.includes("medium")) {
      return "bg-orange-100 text-orange-800"
    } else {
      return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Card className="w-full max-w-2xl shadow-lg border border-muted mb-4">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{summary.generated && email.subject}</h3>
            {summary.generated && (
              <p className="text-sm text-muted-foreground mt-1">
                From: <span className="font-medium">{email.from}</span>
              </p>
            )}
          </div>
          {summary.generated && summary.urgency && (
            <div className={`px-3 py-1 rounded-full text-medium font-medium ${getUrgencyClass(summary.urgency)}`}>
              {summary.urgency}
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            {/* Fix: Don't render summary.generated as content since it's a boolean */}
            {typeof summary.generated === "string" && <p className="text-sm text-foreground">{summary.generated}</p>}
          </div>

          <div>
            {summary.generated && Array.isArray(summary.summary) && summary.summary.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-1">Summary</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  {summary.summary.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Summary and response loading/display logic */}
          {!summary.generated && !summary.displayresponse ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4"></div>
              <h3 className="text-lg font-medium">Generating Summaries and Responses...</h3>
            </div>
          ) : (
            summary.generated &&
            !summary.displayresponse && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-foreground">{summary.suggestedResponse}</p>
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                <span>
                  <h1>Loading Responses...</h1>
                </span>
              </div>
            )
          )}
        </CardContent>

        {/* Accept/Reject buttons */}
        {summary.generated && (
          <CardFooter className="flex justify-between">
            <Button
              onClick={handleReject}
              disabled={!selectedOption}
              className={`transition-colors ${
                selectedOption
                  ? "bg-white text-red-600 border border-red-600 hover:bg-red-50"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              variant="ghost"
            >
              Reject
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!selectedOption}
              className={`transition-colors ${
                selectedOption
                  ? "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              variant="ghost"
            >
              Accept
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Response option cards (A/B) */}
      {summary.generated && summary.displayresponse && summary.generatedresponse?.response_options && (
        <div className="flex w-full max-w-2xl gap-4 mt-2">
          {summary.generatedresponse.response_options.map((option, index) => {
            const optLetter = String.fromCharCode(65 + index) // A, B, etc.
            const isSelected = selectedOption === optLetter
            const baseClasses =
              "flex-1 p-6 rounded-lg border bg-white cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center"

            const activeStyles = isSelected
              ? index === 0
                ? "bg-blue-100 border-blue-500 shadow-2xl"
                : "bg-green-100 border-green-500 shadow-2xl"
              : "hover:bg-gray-50 hover:border-gray-300"

            return (
              <div
                key={index}
                className={`${baseClasses} ${activeStyles}`}
                onClick={() => handleOptionClick(optLetter)}
              >
                <h3 className="font-medium text-lg mb-2">Option {optLetter}</h3>
                <p className="text-sm text-gray-600">{option.response}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
