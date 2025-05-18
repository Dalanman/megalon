/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import emailMock from "@/lib/emailMock.json";
import { SlideCard } from "@/components/slideCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  LayoutDashboard,
  Loader2,
  RefreshCcw,
  Mail,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Define interfaces to match the expected data structures
interface EmailData {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  date: string;
  // These fields might be added by the API response
  summary?: string[];
  urgency?: string;
  suggestedResponse?: string;
}

interface ResponseData {
  email_id: string;
  response_options: Array<{
    option: string;
    response: string;
  }>;
}

export function SlideSupportView() {
  // Initialize with proper typing
  const [emails, setEmails] = useState<EmailData[]>(emailMock as EmailData[]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displaySuggested, setSuggested] = useState(false);
  const [displayResponse, setResponse] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState<ResponseData[]>([
    {
      email_id: "",
      response_options: [{ option: "", response: "" }],
    },
  ]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // First API call to get summaries
        const summaryResponse = await fetch("/api/chat/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: emails }),
        });

        if (!summaryResponse.ok) {
          console.error("Failed to fetch summaries:", summaryResponse.status);
          return;
        }

        const summaryData = await summaryResponse.json();
        console.log("Summary data:", summaryData.response);

        // Update emails with summary data
        if (Array.isArray(summaryData.response)) {
          setEmails(summaryData.response);
          setSuggested(true);
        }

        // Second API call to get response options
        const replyResponse = await fetch("/api/chat/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: summaryData.response || emails }),
        });

        if (!replyResponse.ok) {
          console.error("Failed to fetch replies:", replyResponse.status);
          return;
        }

        const replyData = await replyResponse.json();
        console.log("Reply data:", replyData.response);

        // Update response data
        if (Array.isArray(replyData.response)) {
          setGeneratedResponse(replyData.response);
          setResponse(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEmails();
  }, []); // Runs only once on mount

  const router = useRouter();
  const handleAccept = () => {
    console.log("Accepted:", emails[currentIndex]?.id);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    console.log("Rejected:", emails[currentIndex]?.id);
    setCurrentIndex((prev) => prev + 1);
  };

  const currentEmail = emails[currentIndex];
  const currentResponse =
    generatedResponse.find(
      (response) => response.email_id === currentEmail?.id
    ) || generatedResponse[currentIndex];

  if (!currentEmail) {
    return (
      <div className="flex flex-col items-center justify-center p-50 h-full rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Come back when you&apos;ve received more emails!
        </h2>
        <p className="mb-4">
          It looks like you haven&apos;t received any emails yet. When new
          emails arrive, they&apos;ll appear here.
        </p>
      </div>
    );
  }

  const handleDashboard = () => {
    // Navigate to the dashboard/swipe view
    router.push("/dashboard");
  };

  // Prepare the summary object with safe fallbacks
  const summaryObject = {
    summary: currentEmail.summary || [],
    urgency: currentEmail.urgency || "Low",
    suggestedResponse: currentEmail.suggestedResponse || "",
    generated: displaySuggested,
    displayresponse: displayResponse,
    generatedresponse: currentResponse
      ? {
          response_options: currentResponse.response_options.map((opt) => ({
            response: opt.response,
          })),
        }
      : undefined,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="absolute right-0 top-0 p-15">
        <Button
          size="sm"
          className="h-9 gap-2 shadow-sm transition-all hover:shadow-md"
          onClick={handleDashboard}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Mailbox</span>
        </Button>
      </div>
      <SlideCard
        email={{
          email_id: currentEmail.id,
          from: currentEmail.name,
          subject: currentEmail.subject,
        }}
        summary={summaryObject}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}
