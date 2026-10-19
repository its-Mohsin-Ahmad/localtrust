import { User } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ProviderSupportPage() {
  return (
    <SectionPage
      title="Support"
      description="Get help with bookings, payments, or your account."
      icon={<User className="w-5 h-5" />}
      action={{ label: "Contact Us", href: "/contact" }}
    />
  );
}
