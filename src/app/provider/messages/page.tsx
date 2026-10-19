import { MessageSquare } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderMessagesPage() {
  return (
    <SectionPage
      title="Messages"
      description="Chat with customers about their bookings."
      icon={<MessageSquare className="w-5 h-5" />}
    />
  );
}
