import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ChatDefault() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Select a Chat</h1>
        <p className="text-muted-foreground">
          Please select a booking to start chatting.
        </p>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
