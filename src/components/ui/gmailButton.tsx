"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
export function GmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleLogin() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'http:localhost:3000/auth/callback',
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    }
,
  },
})      
        
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
