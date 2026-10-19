import { Users } from "lucide-react";
import { SectionPage } from "@/components/dashboard/section-page";

export default function UsersPage() {
  return (
    <SectionPage
      title="Users"
      description="Manage customer and provider accounts."
      icon={<Users className="w-5 h-5" />}
    />
  );
}
