import { CreditCard } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function PaymentsPage() {
  return (
    <SectionPage
      title="Payments"
      description="Your payment history and receipts."
      icon={<CreditCard className="w-5 h-5" />}
      action={{ label: "Pay Registration Fee", href: "/payment/registration?role=customer" }}
    />
  );
}
