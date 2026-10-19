import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageAsset } from "@/components/ui/image";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 md:py-24 border-b border-[#E4E7EC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2">
              <ImageAsset asset="aboutProfessionals" className="rounded-card shadow-lg object-cover" alt="Service professionals" objectPosition="center" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#FF6900]/10 text-[#FF6900] text-xs font-semibold tracking-wider uppercase">About LocalTrust</span>
              <h2 className="text-[36px] font-bold text-[#182230] leading-tight mb-4">Trusted Services. Better Living.</h2>
              <p className="text-[#667085] text-lg mb-6 leading-relaxed max-w-xl">LocalTrust connects customers with verified local service professionals across Pakistan. From plumbing and electrical to cleaning and AC repair, we make it simple to discover, compare, and book the right expert for every job.</p>
              <Link href="/become-a-provider" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6900] text-white rounded-card font-medium hover:bg-[#e55a00] transition-colors">Join as a Provider <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-[#F1F3F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[32px] font-bold text-[#182230] mb-6">Our Commitment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Verified Professionals", desc: "Identity and qualification checks where applicable." },
              { title: "Transparent Pricing", desc: "Know the cost before you book. No hidden fees." },
              { title: "Genuine Reviews", desc: "Real feedback from verified customers." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-card border border-[#E4E7EC] shadow-sm">
                <h3 className="font-bold text-[#182230] mb-2">{item.title}</h3>
                <p className="text-[#667085] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
