"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function GmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleLogin() {
        setIsLoading(true);
        // In a real app, we would authenticate with Gmail
        // For demo purposes, we'll just redirect to the dashboard
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    }

  return (
    <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Connecting to Gmail...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>Sign in with Gmail</span>
        </div>
      )}
    </Button>
  );
}
