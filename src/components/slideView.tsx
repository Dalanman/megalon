"use client";

import { useEffect, useState } from "react";
import emailMock from "@/lib/emailMock.json";
import { SlideCard } from "./slideCard";
export function SlideSupportView() {
  const [emails, setEmails] = useState(emailMock);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await fetch("/api/chat/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: emails }),
      });
      if (!response.ok) {
        console.error("Failed to fetch:", response.status);
        return;
      }

      const data = await response.json();
      setEmails(data);
    };

    fetchEmails();
  });

  const handleAccept = () => {
    console.log("Accepted:", emails[currentIndex].id);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    console.log("Rejected:", emails[currentIndex].id);
    setCurrentIndex((prev) => prev + 1);
  };

  const currentEmail = emails[currentIndex];

  if (!currentEmail) {
    return <p className="text-center mt-20">🎉 You're all caught up!</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <SlideCard
        email={{
          email_id: currentEmail.id,
          from: currentEmail.name,
          subject: currentEmail.subject,
        }}
        summary={{
          summary: currentEmail.summary,
          urgency: currentEmail.urgency,
          suggestedResponse: currentEmail.suggestedResponse || "",
        }}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}
