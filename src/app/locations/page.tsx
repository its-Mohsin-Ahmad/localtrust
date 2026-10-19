import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-header";

const LOCATIONS = [
  { name: "Lahore", region: "Punjab", count: "1,200 providers", href: "/locations/lahore" },
  { name: "Karachi", region: "Sindh", count: "1,500 providers", href: "/locations/karachi" },
  { name: "Islamabad", region: "ICT", count: "600 providers", href: "/locations/islamabad" },
  { name: "Rawalpindi", region: "Punjab", count: "400 providers", href: "/locations/rawalpindi" },
  { name: "Faisalabad", region: "Punjab", count: "500 providers", href: "/locations/faisalabad" },
  { name: "Multan", region: "Punjab", count: "350 providers", href: "/locations/multan" },
  { name: "Peshawar", region: "KPK", count: "300 providers", href: "/locations/peshawar" },
  { name: "Quetta", region: "Balochistan", count: "150 providers", href: "/locations/quetta" },
] as const;

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Locations" description="Find professionals in your city." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1.25rem] mt-10">
            {LOCATIONS.map((loc) => (
              <Link key={loc.href} href={loc.href} className="block">
                <div className="aspect-square overflow-hidden rounded-card border border-[#E4E7EC] bg-white p-4 hover-lift">
                  <div className="bg-[#F1F3F5] flex items-center justify-center h-16 w-16 rounded-lg mb-3">
                    <MapPin className="h-6 w-6 text-[#082B60]" />
                  </div>
                  <h3 className="font-bold text-[#182230] text-sm">{loc.name}</h3>
                  <p className="text-[13px] text-[#667085]">{loc.region}</p>
                  <p className="text-[13px] text-[#FF6900] font-medium mt-1">{loc.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
