import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-header";
import { LOCATIONS, getLocation } from "@/lib/locations";
import { withBasePath } from "@/lib/base-path";

// Static export (GitHub Pages): pre-render every city linked from /locations.
export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ city: loc.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { city: string };
}): Metadata {
  const loc = getLocation(params.city);
  return {
    title: `${loc.name} Services`,
    description: `Find trusted INVOLVE professionals in ${loc.name}, ${loc.region}.`,
  };
}

const CITY_SERVICES = [
  { name: "Plumbing", slug: "plumbing", image: "/images/assets/cat-plumbing.jpg" },
  { name: "Electrical", slug: "electrical", image: "/images/assets/cat-electrical.jpg" },
  { name: "Home Cleaning", slug: "cleaning", image: "/images/assets/cat-cleaning.jpg" },
  { name: "Mechanics", slug: "mechanics", image: "/images/assets/cat-mechanics.jpg" },
  { name: "Tutoring", slug: "tutoring", image: "/images/assets/cat-tutoring.jpg" },
  { name: "Painting", slug: "painting", image: "/images/assets/cat-painting.jpg" },
];

const CITY_PROVIDERS = [
  {
    name: "Ahmed Raza",
    profession: "Plumber",
    rating: 4.9,
    reviews: 24,
    price: "PKR 1,500+",
    image: "/images/assets/expert-ahmed.jpg",
    slug: "ahmed-raza",
  },
  {
    name: "Sara Khan",
    profession: "Electrician",
    rating: 4.8,
    reviews: 18,
    price: "PKR 1,200+",
    image: "/images/assets/expert-sara.jpg",
    slug: "sara-khan",
  },
  {
    name: "Usman Ali",
    profession: "Home Cleaner",
    rating: 4.7,
    reviews: 32,
    price: "PKR 1,000+",
    image: "/images/assets/expert-usman.jpg",
    slug: "usman-ali",
  },
  {
    name: "Ayesha Malik",
    profession: "Mathematics Tutor",
    rating: 4.9,
    reviews: 41,
    price: "PKR 1,000+",
    image: "/images/assets/expert-ayesha.jpg",
    slug: "ayesha-malik",
  },
];

export default function CityPage({ params }: { params: { city: string } }) {
  const loc = getLocation(params.city);
  const others = LOCATIONS.filter((l) => l.slug !== loc.slug);

  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Hero */}
      <section className="bg-[#061B40] border-b border-[#0A2E66]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-[#A0AEC0]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#4A5A73]">
                /
              </li>
              <li>
                <Link
                  href="/locations"
                  className="hover:text-white transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#4A5A73]">
                /
              </li>
              <li className="text-white font-medium">{loc.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-barlow text-3xl sm:text-[40px] font-black uppercase tracking-tight text-white">
                PROFESSIONALS IN {loc.name.toUpperCase()}
              </h1>
              <div className="mt-2 h-[3px] w-12 bg-[#FF6900]" />
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#C9D4E5]">
                <MapPin className="h-4 w-4 text-[#FF6900]" />
                {loc.name}, {loc.region}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#FF6900]">
                {loc.count}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-card bg-[#FF6900] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e55a00] transition-colors"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/search?location=${encodeURIComponent(loc.name)}`}
                className="inline-flex items-center gap-2 rounded-card border border-[#1C3E70] px-5 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Search Professionals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular services */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Popular services in ${loc.name}`}
            description={`The most requested services in ${loc.name} right now.`}
            viewAll={{ label: "All Services", href: "/services" }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {CITY_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col rounded-md overflow-hidden border border-[#DCE4ED] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-[#FF6900]"
              >
                <div className="relative h-20 sm:h-24 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={withBasePath(service.image)}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-2.5 text-center">
                  <h3 className="text-xs sm:text-[13px] font-bold leading-tight truncate text-[#082B60]">
                    {service.name}
                  </h3>
                  <div className="mt-2.5">
                    <span className="inline-block w-full py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-[#FF6900] text-[#FF6900] group-hover:bg-[#FF6900] group-hover:text-white transition-colors">
                      VIEW SERVICES
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top professionals */}
      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Top professionals in ${loc.name}`}
            description="Highly rated and verified INVOLVE providers."
            viewAll={{ label: "All Professionals", href: "/providers" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CITY_PROVIDERS.map((p) => (
              <div
                key={p.slug}
                className="group flex flex-col justify-between rounded-md border border-[#DCE4ED] bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100 border border-[#E2E8F0]">
                    <Image
                      src={withBasePath(p.image)}
                      alt={p.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm text-[#082B60] truncate leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-[#65758B] font-medium leading-tight mt-0.5">
                      {p.profession}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] mt-1">
                      <Star className="h-3 w-3 fill-[#FF6900] text-[#FF6900] shrink-0" />
                      <span className="font-bold text-[#082B60]">
                        {p.rating.toFixed(1)}
                      </span>
                      <span className="text-[#65758B]">({p.reviews})</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-extrabold text-xs text-[#082B60]">
                        {p.price}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#15965A]">
                        <CheckCircle2 className="h-3 w-3 fill-[#15965A] text-white" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2">
                  <Link
                    href={`/providers/${p.slug}`}
                    className="inline-flex items-center justify-center py-1.5 px-2 rounded text-[11px] font-bold text-[#082B60] bg-white border border-[#082B60] hover:bg-[#F2F5F8] transition-colors text-center"
                  >
                    View Profile
                  </Link>
                  <Link
                    href="/customer/find-services"
                    className="inline-flex items-center justify-center py-1.5 px-2 rounded text-[11px] font-bold text-white bg-[#FF6900] hover:bg-[#E95B00] transition-colors text-center shadow-sm"
                  >
                    Request Booking
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-card border border-[#E4E7EC] bg-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#182230]">
                  Explore other cities
                </h2>
                <p className="mt-1 text-sm text-[#667085]">
                  INVOLVE is growing across Pakistan.
                </p>
              </div>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6900] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                All locations
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/locations/${other.slug}`}
                  className="rounded-md border border-[#DCE4ED] bg-[#F1F3F5] px-3 py-3 text-center hover:border-[#FF6900] hover:bg-white transition-colors"
                >
                  <span className="block text-[13px] font-bold text-[#082B60]">
                    {other.name}
                  </span>
                  <span className="block text-[11px] text-[#65758B] mt-0.5">
                    {other.region}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}