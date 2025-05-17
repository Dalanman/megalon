"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function SlideSupportView() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedResponseId, setSelectedResponseId] = useState<string | null>(null)
  const [direction, setDirection] = useState("")
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
//   const { toast } = useToast()

//   const currentEmail = mockCustomerEmails[currentIndex]

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!selectedResponseId) return
    setIsDragging(true)
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedResponseId) return

    const deltaX = e.clientX - startPos.x
    setPosition({ x: deltaX, y: 0 })

    if (deltaX > 50) {
      setDirection("right")
    } else if (deltaX < -50) {
      setDirection("left")
    } else {
      setDirection("")
    }
  }

  const handleMouseUp = () => {
    if (!selectedResponseId) return
    setIsDragging(false)

    if (direction === "right") {
      // Send the reply
      handleSwipeRight()
    } else {
      // Reset position
      setPosition({ x: 0, y: 0 })
      setDirection("")
    }
  }

  const handleSwipeRight = () => {
    if (!selectedResponseId) return

    // Find the selected response
    const selectedResponse = currentEmail.responseOptions.find((option) => option.id === selectedResponseId)

    // In a real app, this would send the reply
    toast({
      title: "Reply Sent",
      description: `Response sent to ${currentEmail.customer}`,
    })

    // Move to next card
    if (currentIndex < mockCustomerEmails.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Reset to first card if we've gone through all emails
      setCurrentIndex(0)
    }

    // Reset states
    setSelectedResponseId(null)
    setPosition({ x: 0, y: 0 })
    setDirection("")
  }

  const handleSwipeLeft = () => {
    // Skip this email
    if (currentIndex < mockCustomerEmails.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Reset to first card if we've gone through all emails
      setCurrentIndex(0)
    }

    // Reset states
    setSelectedResponseId(null)
    setPosition({ x: 0, y: 0 })
    setDirection("")
  }

  // Reset position when changing cards
  useEffect(() => {
    setPosition({ x: 0, y: 0 })
    setDirection("")
    setSelectedResponseId(null)
  }, [currentIndex])

  // Get the selected response text
  const selectedResponseText = selectedResponseId
    ? currentEmail.responseOptions.find((option) => option.id === selectedResponseId)?.text
    : null

  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>No More Emails</CardTitle>
            <CardDescription>You've processed all customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-500">Check back later for new messages</p>
          </CardContent>
        </Card>
      </div>

      <div
        ref={cardRef}
        className={cn(
          "absolute left-0 top-0 h-full w-full cursor-grab transition-all duration-300",
          isDragging && selectedResponseId ? "cursor-grabbing" : "cursor-default",
        )}
        style={{
          transform: `translateX(${position.x}px) rotate(${position.x * 0.05}deg)`,
          opacity: direction === "right" || direction === "left" ? 0.8 : 1,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Card className="h-full">
          <CardHeader className="space-y-2 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "bg-slate-50",
                    currentEmail.priority === "High" && "border-red-200 bg-red-50 text-red-700",
                    currentEmail.priority === "Medium" && "border-yellow-200 bg-yellow-50 text-yellow-700",
                    currentEmail.priority === "Low" && "border-green-200 bg-green-50 text-green-700",
                  )}
                >
                  {currentEmail.priority} Priority
                </Badge>
                <Badge variant="outline" className="bg-slate-50 text-slate-700">
                  {currentEmail.category}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" /> <span>{currentEmail.waitTime}</span>
              </div>
            </div>
            <CardTitle className="text-lg">{currentEmail.subject}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              From: <span className="font-medium">{currentEmail.customer}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] space-y-4 overflow-y-auto pb-0">
            <Card className="border-slate-200 shadow-none">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm font-medium">Customer Inquiry</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-sm text-gray-600">{currentEmail.message}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-none">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm font-medium">Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <p className="text-sm text-gray-600">{currentEmail.summary}</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-none">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm font-medium">Choose a Response</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <RadioGroup value={selectedResponseId || ""} onValueChange={setSelectedResponseId}>
                  {currentEmail.responseOptions.map((option) => (
                    <div key={option.id} className="mb-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex items-center gap-2 font-medium">
                          {option.type}
                          <Badge variant="outline" className="font-normal">
                            {option.type === "Concise"
                              ? "Short"
                              : option.type === "Detailed"
                                ? "Comprehensive"
                                : option.type}
                          </Badge>
                        </Label>
                      </div>
                      <div className="ml-6 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                        {option.text}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {currentEmail.knowledgeBase && (
              <Card className="border-dashed border-slate-200 shadow-none">
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm font-medium">Knowledge Base</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-gray-600">{currentEmail.knowledgeBase}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
          <CardFooter className="mt-auto flex justify-between pt-4">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-2 border-gray-300 bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              onClick={handleSwipeLeft}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="flex flex-col items-center">
              {!selectedResponseId && <span className="mb-2 text-xs text-slate-500">Select a response to send</span>}
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "h-12 w-12 rounded-full border-2 bg-white",
                  selectedResponseId
                    ? "border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600"
                    : "border-gray-300 text-gray-400 hover:bg-gray-100 hover:text-gray-600",
                )}
                onClick={handleSwipeRight}
                disabled={!selectedResponseId}
              >
                <Check className="h-6 w-6" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {direction === "right" && selectedResponseId && (
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-green-500 p-2 text-white">
          <Check className="h-6 w-6" />
        </div>
      )}

      {direction === "left" && (
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-gray-500 p-2 text-white">
          <X className="h-6 w-6" />
        </div>
      )}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex gap-1">
          {mockCustomerEmails.map((_, index) => (
            <div
              key={index}
              className={cn("h-1.5 w-1.5 rounded-full", index === currentIndex ? "bg-slate-700" : "bg-gray-300")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
