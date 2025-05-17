"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowDownAZ,
  Filter,
  Inbox,
  LayoutDashboard,
  Loader2,
  RefreshCcw,
  Search,
  Star,
  Tags,
} from "lucide-react";

export function MailboxView() {
  const [emails, setEmails] = useState(mockGmailEmails);
  const [isClassifying, setIsClassifying] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const fetchEmails = () => {};

  const handleClassify = () => {
    setIsClassifying(true);

    const handleSummarize = () => {
      // Navigate to the dashboard/swipe view
      router.push("/dashboard");
    };

    const handleRefresh = () => {
      setIsRefreshing(true);

      // Simulate fetching new emails

      return (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Mailbox</h1>
              <p className="text-sm text-muted-foreground">
                Showing top 50 emails from your Gmail account
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                {isRefreshing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
                Refresh
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleClassify}
                disabled={isClassifying}
              >
                {isClassifying ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Tags className="h-4 w-4" />
                )}
                Classify
              </Button>
              <Button className="gap-2" onClick={handleSummarize}>
                <LayoutDashboard className="h-4 w-4" />
                Summarize
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Inbox</CardTitle>
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search emails..."
                    className="pl-8"
                  />
                </div>
              </div>
              <CardDescription>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs"
                  >
                    <ArrowDownAZ className="h-3.5 w-3.5" />
                    Sort
                  </Button>
                  <Badge
                    variant="outline"
                    className="rounded-sm px-1 font-normal"
                  >
                    Unread: 12
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-sm px-1 font-normal"
                  >
                    Important: 5
                  </Badge>
                  {/* <Badge variant="outline" className="rounded-sm px-1 font-normal">
                Selected: {selectedEmails.length}
              </Badge> */}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* <TableHead className="w-12">
                    <Checkbox onCheckedChange={(checked) => handleSelectAll(!!checked)} aria-label="Select all" />
                  </TableHead> */}
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Sender</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Preview
                      </TableHead>
                      <TableHead className="w-24 text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emails.map((email) => (
                      <TableRow
                        key={email.id}
                        className={email.unread ? "font-medium" : ""}
                      >
                        {/* <TableCell>
                          <Checkbox
                            checked={selectedEmails.includes(email.id)}
                            onCheckedChange={(checked) =>
                              handleSelectEmail(email.id, !!checked)
                            }
                            aria-label={`Select email from ${email.sender}`}
                          />
                        </TableCell> */}
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {email.important && (
                              <Star className="h-4 w-4 text-amber-500" />
                            )}
                            {email.category === "Primary" && (
                              <Inbox className="h-4 w-4 text-blue-500" />
                            )}
                            {email.category === "Social" && (
                              <Badge className="bg-green-500">Social</Badge>
                            )}
                            {email.category === "Promotions" && (
                              <Badge className="bg-yellow-500">Promo</Badge>
                            )}
                            {email.category === "Updates" && (
                              <Badge className="bg-purple-500">Update</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {email.sender}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {email.subject}
                            {email.hasAttachment && (
                              <span className="text-muted-foreground">📎</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                          {email.preview}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {email.date}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    };
  };
}
