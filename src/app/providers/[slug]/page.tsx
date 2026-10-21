import Link from "next/link";
import { MapPin, Star, CheckCircle2, Clock, Phone, ArrowLeft } from "lucide-react";
import { ImageAsset } from "@/components/ui/image";
import { ProviderCard } from "@/components/shared/provider-card";

// Static export (GitHub Pages): pre-render every linked provider slug.
export function generateStaticParams() {
  const slugs = [
    "ahmed-raza",
    "sana-builders",
    "bilal-electricals",
    "cleanpro-lahore",
    "khan-plumbing",
    "furniture-fixers",
    "tutor-academy",
    "green-gardens",
    "sara-khan",
    "usman-ali",
    "ayesha-malik",
  ];
  return slugs.map((slug) => ({ slug }));
}

const PROVIDERS: Record<string, { name: string; service: string; location: string; rating: number; reviewCount: number; verified: boolean; price: string; imageKey: string; since: string; jobs: string; response: string; about: string; services: { name: string; price: string }[]; reviews: { author: string; rating: number; date: string; text: string }[] }> = {
  "ahmed-raza": {
    name: "Ahmed Raza",
    service: "AC Repair & Maintenance",
    location: "Lahore, Punjab",
    rating: 4.9,
    reviewCount: 128,
    verified: true,
    price: "From Rs. 2,500",
    imageKey: "categoryACRepair",
    since: "Mar 2023",
    jobs: "340+",
    response: "Under 1 hour",
    about:
      "Certified HVAC technician with 8+ years of experience servicing split and ducted AC units across Lahore. I provide honest diagnostics, transparent pricing, and same-day appointments wherever possible.",
    services: [
      { name: "AC Servicing & Gas Refill", price: "Rs. 2,500" },
      { name: "AC Installation / Uninstallation", price: "Rs. 4,000" },
      { name: "Compressor Repair", price: "Rs. 6,500" },
      { name: "Annual Maintenance Plan", price: "Rs. 12,000/yr" },
    ],
    reviews: [
      { author: "Hassan Ali", rating: 5, date: "12 Oct 2026", text: "Fixed my AC in 40 minutes. Very professional and cleaned up after the job." },
      { author: "Mehwish Khan", rating: 5, date: "04 Oct 2026", text: "Explained the problem clearly and charged exactly what he quoted." },
      { author: "Zainab Noor", rating: 4, date: "21 Sep 2026", text: "Good service overall. Arrived 30 minutes late but called ahead to let me know." },
    ],
  },
};

const SIMILAR = [
  { slug: "cleanpro-lahore", name: "CleanPro Lahore", service: "Home Deep Cleaning", location: "Lahore, Punjab", rating: 4.9, reviewCount: 174, verified: true, price: "From Rs. 4,000", imageKey: "categoryCleaning" },
  { slug: "bilal-electricals", name: "Bilal Electricals", service: "Electrical Repairs", location: "Karachi, Sindh", rating: 4.7, reviewCount: 211, verified: true, price: "From Rs. 1,500", imageKey: "categoryElectrical" },
  { slug: "khan-plumbing", name: "Khan Plumbing Works", service: "Plumbing & Leaks", location: "Rawalpindi, Punjab", rating: 4.6, reviewCount: 89, verified: false, price: "From Rs. 1,200", imageKey: "categoryPlumbing" },
  { slug: "sana-builders", name: "Sana Builders", service: "Painting & Decorating", location: "Islamabad, ICT", rating: 4.8, reviewCount: 96, verified: true, price: "From Rs. 6,000", imageKey: "categoryPainting" },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            "w-3.5 h-3.5 " + (i <= Math.round(rating) ? "text-[#FF6900] fill-[#FF6900]" : "text-[#E4E7EC]")
          }
        />
      ))}
    </span>
  );
}

export default function ProviderProfilePage({ params }: { params: { slug: string } }) {
  const provider = PROVIDERS[params.slug] ?? PROVIDERS["ahmed-raza"];
  return <ProfileBody provider={provider} slug={params.slug} />;
}

function ProfileBody({
  provider,
  slug,
}: {
  provider: (typeof PROVIDERS)["ahmed-raza"];
  slug: string;
}) {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Cover */}
      <div className="bg-[#082B60]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
          <Link href="/providers" className="inline-flex items-center gap-1.5 text-sm text-[#E4E7EC] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> All providers
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#E4E7EC] rounded-card p-6 flex flex-col sm:flex-row gap-6">
              <div className="w-28 h-28 rounded-card overflow-hidden border border-[#E4E7EC] shrink-0">
                <ImageAsset asset={provider.imageKey} className="w-full h-full object-cover object-center" alt={`${provider.name} profile`} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-[26px] font-bold text-[#182230]">{provider.name}</h1>
                  {provider.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#16A34A]/10 text-[#16A34A] text-[11px] font-semibold border border-[#16A34A]/20">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-[#667085] text-sm mt-1">{provider.service}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#667085]">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {provider.location}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> Responds {provider.response}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="font-semibold text-[#182230] text-sm">{provider.rating.toFixed(1)}</span>
                  <StarRow rating={provider.rating} />
                  <span className="text-[#667085] text-sm">({provider.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-[#E4E7EC] rounded-card p-4 text-center">
                <p className="text-[22px] font-bold text-[#082B60]">{provider.jobs}</p>
                <p className="text-[#667085] text-xs mt-1">Jobs completed</p>
              </div>
              <div className="bg-white border border-[#E4E7EC] rounded-card p-4 text-center">
                <p className="text-[22px] font-bold text-[#082B60]">{provider.rating.toFixed(1)}</p>
                <p className="text-[#667085] text-xs mt-1">Average rating</p>
              </div>
              <div className="bg-white border border-[#E4E7EC] rounded-card p-4 text-center">
                <p className="text-[22px] font-bold text-[#082B60]">{provider.since}</p>
                <p className="text-[#667085] text-xs mt-1">Member since</p>
              </div>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-card p-6">
              <h2 className="font-bold text-[#182230] mb-3">About</h2>
              <p className="text-[#667085] text-sm leading-relaxed">{provider.about}</p>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-card p-6">
              <h2 className="font-bold text-[#182230] mb-4">Services & Pricing</h2>
              <ul className="divide-y divide-[#E4E7EC]">
                {provider.services.map((s) => (
                  <li key={s.name} className="flex items-center justify-between py-3">
                    <span className="text-sm text-[#182230]">{s.name}</span>
                    <span className="text-sm font-semibold text-[#082B60]">{s.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#182230]">Reviews</h2>
                <span className="text-sm text-[#667085]">{provider.reviewCount} total</span>
              </div>
              <div className="space-y-4">
                {provider.reviews.map((r, i) => (
                  <div key={i} className="border border-[#E4E7EC] rounded-card p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[#182230]">{r.author}</span>
                      <span className="text-xs text-[#667085]">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <StarRow rating={r.rating} />
                    </div>
                    <p className="text-sm text-[#667085] mt-2 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: booking sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E4E7EC] rounded-card p-6 sticky top-6">
              <p className="text-[#667085] text-sm">Starting from</p>
              <p className="text-[#FF6900] text-2xl font-bold mt-1">{provider.price}</p>
              <a
                href="#book"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-[#FF6900] text-white font-semibold text-sm hover:bg-[#e55a00] transition-colors"
              >
                Book Now
              </a>
              <a
                href="#message"
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-card border border-[#E4E7EC] text-[#182230] font-medium text-sm hover:bg-[#F1F3F5] transition-colors"
              >
                <Phone className="w-4 h-4" /> Contact Provider
              </a>
              <ul className="mt-5 space-y-2.5 text-xs text-[#667085]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" /> Payment held securely until job completion</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" /> Free cancellation up to 24 hours before</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" /> Dispute support from INVOLVE team</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Similar providers */}
        <section className="mt-12">
          <h2 className="text-[22px] font-bold text-[#182230] mb-6">Similar Providers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {SIMILAR.filter((p) => p.slug !== slug).map((p) => (
              <ProviderCard key={p.slug} {...p} href={`/providers/${p.slug}`} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

