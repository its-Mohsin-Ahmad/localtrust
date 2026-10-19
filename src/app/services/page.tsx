import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/shared/service-category-card";
import { SearchBar } from "@/components/shared/search-bar";

const CATEGORIES = [
  { imageKey: "categoryPlumbing", title: "Plumbing", count: "152 providers", href: "/services/plumbing" },
  { imageKey: "categoryElectrical", title: "Electrical", count: "134 providers", href: "/services/electrical" },
  { imageKey: "categoryCleaning", title: "Cleaning", count: "210 providers", href: "/services/cleaning" },
  { imageKey: "categoryACRepair", title: "AC Repair", count: "98 providers", href: "/services/ac-repair" },
  { imageKey: "categoryCarpentry", title: "Carpentry", count: "76 providers", href: "/services/carpentry" },
  { imageKey: "categoryPainting", title: "Painting", count: "82 providers", href: "/services/painting" },
  { imageKey: "categoryComputerRepair", title: "Computer & IT", count: "59 providers", href: "/services/computer-repair" },
  { imageKey: "categoryMoving", title: "Moving Services", count: "38 providers", href: "/services/moving" },
  { imageKey: "categoryGardening", title: "Gardening", count: "46 providers", href: "/services/gardening" },
  { imageKey: "categoryTutoring", title: "Tutoring", count: "76 providers", href: "/services/tutoring" },
  { imageKey: "categorySolar", title: "Solar Services", count: "34 providers", href: "/services/solar" },
  { imageKey: "categoryPestControl", title: "Pest Control", count: "28 providers", href: "/services/pest-control" },
] as const;

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-8 md:py-16 border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Services" description="Find trusted professionals for every need." />
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1.25rem]">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.href} {...cat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
