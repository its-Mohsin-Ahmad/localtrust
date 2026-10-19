import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { SectionHeading } from "@/components/ui/section-header";
import { CategoryCard } from "@/components/shared/service-category-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageAsset } from "@/components/ui/image";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { imageKey: "categoryPlumbing", title: "Plumbing", count: "152 providers", href: "/services/plumbing" },
  { imageKey: "categoryElectrical", title: "Electrical", count: "134 providers", href: "/services/electrical" },
  { imageKey: "categoryCleaning", title: "Cleaning", count: "210 providers", href: "/services/cleaning" },
  { imageKey: "categoryACRepair", title: "AC Repair", count: "98 providers", href: "/services/ac-repair" },
  { imageKey: "categoryCarpentry", title: "Carpentry", count: "76 providers", href: "/services/carpentry" },
  { imageKey: "categoryPainting", title: "Painting", count: "82 providers", href: "/services/painting" },
  { imageKey: "categoryComputerRepair", title: "Computer & IT", count: "59 providers", href: "/services/computer-repair" },
  { imageKey: "categoryMoving", title: "Moving Services", count: "38 providers", href: "/services/moving" },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white">
      <HeroCarousel />

      <section className="py-16 md:py-24 border-y border-[#E4E7EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Explore Popular Services"
            description="Find the right professional for your everyday needs."
            viewAll={{ label: "View All Services", href: "/services" }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1.25rem] mt-8">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.href} {...cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/3">
              <ImageAsset
                asset="aboutProfessionals"
                className="rounded-card shadow-lg object-cover"
                alt="LocalTrust professionals serving the community"
                objectPosition="center"
              />
            </div>
            <div className="lg:w-2/3 flex flex-col justify-center">
              <h2 className="text-[36px] font-bold text-[#182230] leading-tight mb-4">
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

      <section className="py-16 md:py-24 bg-[#F1F3F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How LocalTrust Works"
            description="Simple steps to book trusted local services."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { num: "1", title: "Search for a service", desc: "Find local professionals by category, location, and availability." },
              { num: "2", title: "Compare professionals", desc: "View profiles, ratings, reviews, and pricing before booking." },
              { num: "3", title: "Request a booking", desc: "Select a date, describe the job, and submit your request." },
              { num: "4", title: "Complete & review", desc: "Get the service done and leave genuine feedback." },
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-card border border-[#E4E7EC] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#082B60] flex items-center justify-center text-white font-bold text-sm">{step.num}</div>
                  <h3 className="font-bold text-[#182230]">{step.title}</h3>
                </div>
                <p className="text-[#667085] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <ImageAsset
                asset="providerRegistration"
                className="rounded-card shadow-lg object-cover"
                alt="Skilled professional working in a trade"
                objectPosition="center"
              />
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-[36px] font-bold text-[#182230] leading-tight mb-4">
                Your Skills Deserve More Opportunities
              </h2>
              <p className="text-[#667085] text-lg mb-6 leading-relaxed max-w-xl">
                Create your professional profile and connect with customers in your
                service areas. Join thousands of verified professionals growing their
                business with LocalTrust.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[#FF6900] text-lg font-bold">Rs. 200</span>
                <span className="text-[#9CA3AF] text-sm">one-time registration fee</span>
              </div>
              <Button size="lg" className="bg-[#FF6900] text-white w-full lg:w-auto">Become a Provider</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F1F3F5] rounded-card border border-[#E4E7EC] p-8 md:p-12">
            <h2 className="text-[32px] font-bold text-[#182230] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "How do I book a service on LocalTrust?", a: "Search for a service, compare professionals, and request a booking — all in one place." },
                { q: "Is the registration fee refundable?", a: "The one-time Rs. 200 registration fee covers account activation and is non-refundable once your account is verified." },
                { q: "Are providers verified?", a: "Providers go through a separate verification process. Payment does not equal verification — verified badges are only awarded after checks are completed." },
                { q: "How do I pay for services?", a: "Payments are handled securely through the platform. You can pay after the service is completed and verified." },
              ].map((faq, i) => (
                <details key={i} className="bg-white border border-[#E4E7EC] rounded-card p-4">
                  <summary className="flex items-center justify-between cursor-pointer font-medium text-[#182230] list-none">
                    {faq.q}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#667085]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <p className="mt-2 text-[#667085] text-sm">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
