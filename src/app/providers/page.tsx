import { SectionHeading } from "@/components/ui/section-header";
import { ProviderCard } from "@/components/shared/provider-card";
import { SearchBar } from "@/components/shared/search-bar";

const PROVIDERS = [
  { slug: "ahmed-raza", name: "Ahmed Raza", service: "AC Repair & Maintenance", location: "Lahore, Punjab", rating: 4.9, reviewCount: 128, verified: true, price: "From Rs. 2,500", imageKey: "categoryACRepair" },
  { slug: "sana-builders", name: "Sana Builders", service: "Painting & Decorating", location: "Islamabad, ICT", rating: 4.8, reviewCount: 96, verified: true, price: "From Rs. 6,000", imageKey: "categoryPainting" },
  { slug: "bilal-electricals", name: "Bilal Electricals", service: "Electrical Repairs", location: "Karachi, Sindh", rating: 4.7, reviewCount: 211, verified: true, price: "From Rs. 1,500", imageKey: "categoryElectrical" },
  { slug: "cleanpro-lahore", name: "CleanPro Lahore", service: "Home Deep Cleaning", location: "Lahore, Punjab", rating: 4.9, reviewCount: 174, verified: true, price: "From Rs. 4,000", imageKey: "categoryCleaning" },
  { slug: "khan-plumbing", name: "Khan Plumbing Works", service: "Plumbing & Leaks", location: "Rawalpindi, Punjab", rating: 4.6, reviewCount: 89, verified: false, price: "From Rs. 1,200", imageKey: "categoryPlumbing" },
  { slug: "furniture-fixers", name: "Furniture Fixers", service: "Carpentry & Assembly", location: "Faisalabad, Punjab", rating: 4.8, reviewCount: 67, verified: true, price: "From Rs. 2,000", imageKey: "categoryCarpentry" },
  { slug: "tutor-academy", name: "Star Tutor Academy", service: "Home Tutoring", location: "Multan, Punjab", rating: 5.0, reviewCount: 43, verified: true, price: "From Rs. 3,000/mo", imageKey: "categoryTutoring" },
  { slug: "green-gardens", name: "Green Gardens", service: "Gardening & Landscaping", location: "Islamabad, ICT", rating: 4.5, reviewCount: 52, verified: false, price: "From Rs. 2,800", imageKey: "categoryGardening" },
];

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-8 md:py-16 border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Providers" description="Browse trusted professionals across Pakistan." />
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {PROVIDERS.map((p) => (
              <ProviderCard
                key={p.slug}
                name={p.name}
                service={p.service}
                location={p.location}
                rating={p.rating}
                reviewCount={p.reviewCount}
                verified={p.verified}
                price={p.price}
                imageKey={p.imageKey}
                href={`/providers/${p.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
