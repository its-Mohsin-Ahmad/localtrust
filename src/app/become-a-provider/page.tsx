import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageAsset } from "@/components/ui/image";


export default function BecomeAProviderPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24 bg-[#082B60] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/3">
              <ImageAsset asset="providerRegistration" className="rounded-card shadow-lg object-cover" alt="Skilled professional at work" objectPosition="center" />
            </div>
            <div className="lg:w-2/3 flex flex-col justify-center">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#FF6900]/10 text-[#FF6900] text-xs font-semibold tracking-wider uppercase">Service Provider</span>
              <h2 className="text-[36px] font-bold leading-tight mb-4">Grow Your Business with LocalTrust</h2>
              <p className="text-[#E4E7EC] text-lg mb-6 leading-relaxed max-w-xl">Showcase your services, connect with customers, and manage your bookings in one place.</p>
              <ul className="space-y-3 mb-8 max-w-xl">
                <li className="flex items-center gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs">+</span> Reach local customers actively searching for your services</li>
                <li className="flex items-center gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs">+</span> Build a professional profile with portfolio images</li>
                <li className="flex items-center gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs">+</span> Manage bookings, availability, and earnings</li>
                <li className="flex items-center gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs">+</span> Build reputation through genuine customer reviews</li>
              </ul>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#FF6900] text-lg font-bold">Rs. 200</span>
                <span className="text-[#9CA3AF] text-sm">one-time registration fee</span>
              </div>
              <Link href="/auth/create-account/provider" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF6900] text-white rounded-card font-semibold text-base hover:bg-[#e55a00] transition-colors">Create Provider Account <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
