import { Search } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function CategoriesPage() {
  return (
    <SectionPage
      title="Categories"
      description="Manage service categories and ordering."
      icon={<Search className="w-5 h-5" />}
    />
  );
}
