import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-header";
import { ProviderCard } from "@/components/shared/provider-card";
import { SearchBar } from "@/components/shared/search-bar";
import { ImageAsset } from "@/components/ui/image";


export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryMap: Record<string, { name: string; imageKey: string; desc: string }> = {
    plumbing: { name: "Plumbing", imageKey: "categoryPlumbing", desc: "Find local plumbers for repairs, installations, and maintenance." },
    electrical: { name: "Electrical", imageKey: "categoryElectrical", desc: "Find licensed electricians for wiring, lighting, and repairs." },
    cleaning: { name: "Cleaning", imageKey: "categoryCleaning", desc: "Find professional cleaners for homes and offices." },
    "ac-repair": { name: "AC Repair", imageKey: "categoryACRepair", desc: "Find AC technicians for installation, service, and repair." },
    carpentry: { name: "Carpentry", imageKey: "categoryCarpentry", desc: "Find carpenters for furniture, doors, and woodwork." },
    painting: { name: "Painting", imageKey: "categoryPainting", desc: "Find painters for interior and exterior painting." },
    "computer-repair": { name: "Computer & IT", imageKey: "categoryComputerRepair", desc: "Find technicians for computer and laptop repair." },
    moving: { name: "Moving Services", imageKey: "categoryMoving", desc: "Find movers for home and office relocation." },
    gardening: { name: "Gardening", imageKey: "categoryGardening", desc: "Find gardeners for landscaping and plant care." },
    tutoring: { name: "Tutoring", imageKey: "categoryTutoring", desc: "Find tutors for academic and skill-based learning." },
    solar: { name: "Solar Services", imageKey: "categorySolar", desc: "Find solar panel installation and maintenance experts." },
    "pest-control": { name: "Pest Control", imageKey: "categoryPestControl", desc: "Find pest control professionals for homes and businesses." },
  };
  const cat = categoryMap[params.slug] || categoryMap.plumbing;
  const providers = [
    { name: "Ahmed Raza", service: cat.name, location: "Lahore, Punjab", rating: 4.8, reviewCount: 124, verified: true, price: "PKR 1,500+", imageKey: cat.imageKey, href: "/providers/ahmed-raza" },
    { name: "Sara Khan", service: cat.name, location: "Lahore, Punjab", rating: 4.6, reviewCount: 98, verified: true, price: "PKR 1,200+", imageKey: cat.imageKey, href: "/providers/sara-khan" },
    { name: "Usman Ali", service: cat.name, location: "Lahore, Punjab", rating: 4.7, reviewCount: 87, verified: true, price: "PKR 1,300+", imageKey: cat.imageKey, href: "/providers/usman-ali" },
  ];
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-6 md:py-12 border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            <div>
              <ImageAsset asset={cat.imageKey} className="h-16 w-16 rounded-lg object-cover object-center mb-2" alt={cat.name} objectPosition="center" />
              <SectionHeading title={cat.name} description={cat.desc} />
            </div>
            <SearchBar className="w-80 md:w-96" />
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1.25rem]">
            {providers.map((p) => (
              <ProviderCard key={p.href} {...p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
