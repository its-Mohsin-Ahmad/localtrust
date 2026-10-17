import { HeroCarousel } from "@/components/hero/hero-carousel";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/cards/category-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";
import { ImageAsset } from "@/components/ui/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <HeroCarousel />

      <section className="py-16 md:py-20 border-y border-[#E4E7EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What Do You Need Help With?"
            description="Browse our most popular service categories and find the right professional near you."
            viewAll={{ label: "View All Services", href: "/services" }}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
            {[
              { assetKey: "categoryPlumbing", title: "Plumbing", count: "152 providers", icon: "wrench" },
              { assetKey: "categoryElectrical", title: "Electrical", count: "134 providers", icon: "lightbulb" },
              { assetKey: "categoryCleaning", title: "Cleaning", count: "210 providers", icon: "sparkles" },
              { assetKey: "categoryACRepair", title: "AC Repair", count: "98 providers", icon: "snowflake" },
              { assetKey: "categoryCarpentry", title: "Carpentry", count: "76 providers", icon: "hammer" },
              { assetKey: "categoryPainting", title: "Painting", count: "82 providers", icon: "brush" },
              { assetKey: "categoryComputerRepair", title: "Computer & IT", count: "59 providers", icon: "laptop" },
              { assetKey: "categoryMoving", title: "Moving Services", count: "38 providers", icon: "truck" },
            ].map((cat) => (
              <CategoryCard key={cat.assetKey} imageKey={cat.assetKey} title={cat.title} count={cat.count} icon={cat.icon as any} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/3">
              <ImageAsset
                asset="aboutProfessionals"
                className="rounded-card shadow-lg object-cover"
                alt="LocalTrust professionals serving the community"
              />
            </div>
            <div className="lg:w-2/3 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[#182230] leading-tight mb-4">
                The Right Expert for Every Job
              </h2>
              <p className="text-[#667085] text-lg mb-6 leading-relaxed max-w-xl">
                Explore professional profiles, compare service options, and request
                the help you need — all from trusted professionals in your area.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/services"
                  className="flex items-center gap-2 px-4 py-3 bg-[#082B60] rounded-card text-white font-medium hover:bg-[#061B40] transition-colors"
                >
                  Browse Categories <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/customer/find-services"
                  className="flex items-center gap-2 px-4 py-3 border border-[#E4E7EC] rounded-card text-[#182230] font-medium hover:bg-[#F1F3F5] transition-colors"
                >
                  Find a Professional <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#F1F3F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="How LocalTrust Works"
            description="Simple steps to book trusted local services."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              {
                num: "1",
                title: "Search for a service",
                desc: "Find local professionals by category, location, and availability.",
              },
              {
                num: "2",
                title: "Compare professionals",
                desc: "View profiles, ratings, reviews, and pricing before booking.",
              },
              {
                num: "3",
                title: "Request a booking",
                desc: "Select a date, describe the job, and submit your request.",
              },
              {
                num: "4",
                title: "Complete & review",
                desc: "Get the service done and leave genuine feedback.",
              },
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-card border border-[#E4E7EC] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#082B60] flex items-center justify-center text-white font-bold text-sm">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-[#182230]">{step.title}</h3>
                </div>
                <p className="text-[#667085] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
