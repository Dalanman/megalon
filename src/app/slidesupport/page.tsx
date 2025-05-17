import { SlideSupportView } from "@/components/slideView"

export default function MailboxPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <main className="flex-1">
        <div className="mx-auto w-full">
          < SlideSupportView />
        </div>
      </main>
    </div>
  )
}