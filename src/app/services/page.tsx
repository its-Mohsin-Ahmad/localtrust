import { SectionHeading } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/shared/service-category-card";
import { SearchBar } from "@/components/shared/search-bar";
import { CATEGORIES } from "@/lib/category-data";

const CATS = CATEGORIES.map((c) => ({
  imageKey: c.heroImageKey,
  title: c.name,
  count: "Providers available",
  href: "/services/" + c.slug,
}));

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F3F7FB]">
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
            {CATS.map((cat) => (
              <CategoryCard key={cat.href} {...cat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

