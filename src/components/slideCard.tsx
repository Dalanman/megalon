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
    urgency: string;
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
  summary.suggestedResponse;
  return (
    <Card className="w-full max-w-2xl shadow-lg border border-muted">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {summary.generated && email.subject}
          </h3>
          {summary.generated && (
            <p className="text-sm text-muted-foreground mt-1">
              From: <span className="font-medium">{email.from}</span>
            </p>
          )}
        </div>
        {summary.generated && (
          <div
            className={`px-3 py-1 rounded-full text-medium font-medium ${
              summary.urgency?.toLowerCase().includes("high")
                ? "bg-red-100 text-red-800"
                : summary.urgency?.toLowerCase().includes("medium")
                ? "bg-orange-100 text-orange-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {summary.urgency}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-foreground">{summary.generated}</p>
        </div>

        <div>
          {summary.generated &&
            Array.isArray(summary.summary) &&
            summary.summary.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-1">Summary</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  {summary.generated &&
                    summary.summary.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                </ul>
              </div>
            )}
        </div>

        {(summary.generated && (
          <div>
            <p className="text-sm text-foreground">
              {summary.suggestedResponse}
            </p>
          </div>
        )) ||
          (!summary.generated && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent mb-4"></div>
              <h3 className="text-lg font-medium">Generating Summaries...</h3>
            </div>
          ))}
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        {summary.generated && (
          <Button variant="destructive" onClick={onReject}>
            Reject
          </Button>
        )}
        {summary.generated && (
          <Button variant="default" onClick={onAccept}>
            Accept
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
