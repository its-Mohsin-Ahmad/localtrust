import { ShieldCheck } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function VerificationPage() {
  return (
    <SectionPage
      title="Verification"
      description="Submit documents to earn your verified badge."
      icon={<ShieldCheck className="w-5 h-5" />}
    />
  );
}
