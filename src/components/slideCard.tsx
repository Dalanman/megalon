// components/SlideCard.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SlideCardProps {
  email: Email;
  summary: EmailSummary;
  onAccept: () => void;
  onReject: () => void;
}

export const SlideCard: React.FC<SlideCardProps> = ({ email, summary, onAccept, onReject }) => {
  return (
    <Card>
      <CardHeader>
        <h3>{email.subject}</h3>
        <p>From: {email.from}</p>
      </CardHeader>
      <CardContent>
        <p>{email.snippet}</p>
        <h4>Summary</h4>
        <p>{summary.summary}</p>
        <h4>Suggested Response</h4>
        <p>{summary.suggestedResponse}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onReject}>Reject</Button>
        <Button onClick={onAccept}>Accept</Button>
      </CardFooter>
    </Card>
  );
};
