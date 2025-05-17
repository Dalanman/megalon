import { MailboxView } from "@/components/mailboxView";

export default function MailboxPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex-1 p-4 pr-50 pl-50">
        <div className="mx-auto w-full">
          <MailboxView></MailboxView>
        </div>
      </main>
    </div>
  );
}
