import { MessageSquare } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function MessagesPage() {
  return (
    <SectionPage
      title="Messages"
      description="Chat with providers about their bookings."
      icon={<MessageSquare className="w-5 h-5" />}
    />
  );
}
