'use client';

import React, { useEffect, useState } from 'react';
import { SlideCard } from "@/components/slideCard"; // path may vary

interface EmailData {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  summary: string;
  suggestedResponse: string;
}

export default function SlideSupportView() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await fetch('/api/emails'); // Replace with actual OpenAI-backed endpoint
      const data = await response.json();
      setEmails(data);
    };
    fetchEmails();
  }, []);

  const handleAccept = () => {
    console.log('Accepted:', emails[currentIndex].id);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    console.log('Rejected:', emails[currentIndex].id);
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
          id: currentEmail.id,
          from: currentEmail.from,
          subject: currentEmail.subject,
          snippet: currentEmail.snippet,
        }}
        summary={{
          summary: currentEmail.summary,
          suggestedResponse: currentEmail.suggestedResponse,
        }}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}
