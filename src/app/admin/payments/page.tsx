import { CreditCard } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function AdminPaymentsPage() {
  return (
    <SectionPage
      title="Payments"
      description="Track platform payments and payouts."
      icon={<CreditCard className="w-5 h-5" />}
    />
  );
}
