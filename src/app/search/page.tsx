import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-header";
import { SearchBar } from "@/components/shared/search-bar";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-8 md:py-16 border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Search Results" description="Find the right professional for your needs." />
          <div className="mt-8">
            <SearchBar className="w-full max-w-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
