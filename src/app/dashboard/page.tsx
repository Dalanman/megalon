import { MailBoxView } from "@/components/mailboxView";

export default function MailboxPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex-1 p-4">
        <div className="mx-auto max-w-6xl">
          <MailBoxView></MailBoxView>
        </div>
      </main>
    </div>
  );
}
