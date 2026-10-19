import { User } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function SupportPage() {
  return (
    <SectionPage
      title="Support"
      description="Get help with your account or bookings."
      icon={<User className="w-5 h-5" />}
      action={{ label: "Contact Us", href: "/contact" }}
    />
  );
}
