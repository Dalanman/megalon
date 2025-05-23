/* eslint-disable */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GmailButton } from "@/components/ui/gmailButton";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <div>
    <div className="flex items-center justify-center min-h-screen w-full">
      <Card className="w-100">
        <CardHeader>
          <CardTitle className="text-xl"> Get started with Megalon.</CardTitle>
          <CardDescription>
            {" "}
            Streamline customer support responses{" "}
          </CardDescription>
        </CardHeader>
        <div className="flex justify-center">
          <Mail />
        </div>
        <div className="flex justify-center p-4">
          <GmailButton />
          
        </div>
      </Card>
      <div className="absolute bottom-0 right-0 m-5">
        <ModeToggle></ModeToggle>
      </div>
    </div>
    </div>
  );
}