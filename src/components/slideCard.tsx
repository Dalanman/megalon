import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SlideCardProps {
  email: {
    email_id: string;
    from: string;
    subject: string;
  };
  summary: {
    summary: string[];
    urgency: boolean;
    suggestedResponse?: string;
    generated: boolean;
  };
  onAccept: () => void;
  onReject: () => void;
}
export const SlideCard: React.FC<SlideCardProps> = ({
  email,
  summary,
  onAccept,
  onReject,
}) => {
  summary.suggestedResponse
  return (
    <Card className="w-full max-w-2xl shadow-lg border border-muted">
      <CardHeader>
        <h3 className="text-xl font-semibold">{email.subject}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          From: <span className="font-medium">{email.from}</span>
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-foreground">{email.snippet}</p>
        </div>

        <div>
          {Array.isArray(summary.summary) && summary.summary.length > 0 && (
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

        {
        summary.generated && (
          <div>
            <p className="text-sm text-foreground">
              {summary.suggestedResponse}
            </p>
          </div>
        ) || !summary.generated && (        
        <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        <span>Generating Summary...</span>
        </div>)}
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button variant="destructive" onClick={onReject}>
          Reject
        </Button>
        <Button variant="default" onClick={onAccept}>
          Accept
        </Button>
      </CardFooter>
    </Card>
  );
};
