import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function SendDailySummaryDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("sai@digicarotene.com");

  const handleSend = () => {
    const reportBody = [
      "Daily Task Summary",
      "",
      "Tasks Completed Today: 5",
      "Tasks Upcoming Today: 2",
      "Tasks Missed Today: 1",
    ].join("\n");

    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      "Daily Task Summary",
    )}&body=${encodeURIComponent(reportBody)}`;

    window.location.href = mailto;
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button className="rounded-full px-5" onClick={() => setOpen(true)}>
        Send Summary
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Daily Summary</DialogTitle>
          <DialogDescription>
            Share today&apos;s task progress with yourself or a coach.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <label className="block text-xs font-semibold text-muted-foreground">
            Recipient email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
            />
          </label>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSend}
            disabled={!email.trim()}
            className="rounded-full"
          >
            Send Summary
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
