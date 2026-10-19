import { Star } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function ReviewsPage() {
  return (
    <SectionPage
      title="Reviews"
      description="Reviews you have written for completed services."
      icon={<Star className="w-5 h-5" />}
    />
  );
}
