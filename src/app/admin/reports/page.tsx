import { TrendingUp } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ReportsPage() {
  return (
    <SectionPage
      title="Reports"
      description="Fraud, dispute, and abuse reports."
      icon={<TrendingUp className="w-5 h-5" />}
    />
  );
}
