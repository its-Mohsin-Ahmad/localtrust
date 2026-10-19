import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-header";
import { ImageAsset } from "@/components/ui/image";


const STEPS = [
  { num: "1", title: "Search for a service", desc: "Find local professionals by category, location, and availability." },
  { num: "2", title: "Compare professionals", desc: "View profiles, ratings, reviews, and pricing before booking." },
  { num: "3", title: "Request a booking", desc: "Select a date, describe the job, and submit your request." },
  { num: "4", title: "Complete & review", desc: "Get the service done and leave genuine feedback." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How LocalTrust Works"
            description="Simple steps to book trusted local services."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {STEPS.map((step, i) => (
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
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <ImageAsset asset="aboutProfessionals" className="rounded-card shadow-lg object-cover" alt="Service professionals" objectPosition="center" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-[36px] font-bold text-[#182230] leading-tight mb-4">Book trusted services in three steps</h2>
              <p className="text-[#667085] text-lg mb-6 leading-relaxed max-w-xl">Discover local professionals, compare their profiles and reviews, and request a booking � all from one place.</p>
              <Link href="/auth/create-account" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6900] text-white rounded-card font-medium hover:bg-[#e55a00] transition-colors">Get Started <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
