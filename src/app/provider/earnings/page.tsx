import { CreditCard } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function EarningsPage() {
  return (
    <SectionPage
      title="Earnings"
      description="Track your income, payouts, and invoices."
      icon={<CreditCard className="w-5 h-5" />}
      action={{ label: "View Dashboard", href: "/provider/dashboard" }}
    />
  );
}
