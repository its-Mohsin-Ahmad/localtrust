import Link from "next/link";
import { ImageAsset } from "@/components/ui/image";
import { Button } from "@/components/ui/button";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <ImageAsset asset="contactSupport" className="rounded-card shadow-lg object-cover" alt="Customer support" objectPosition="center" />
            </div>
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-[36px] font-bold text-[#182230] leading-tight mb-4">Contact Us</h2>
              <p className="text-[#667085] text-lg mb-6 leading-relaxed">Have questions or need help? Get in touch with our support team.</p>
              <form className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-[#182230]">Full name</label>
                  <input id="name" type="text" placeholder="Your name" className="w-full pl-3 pr-4 py-2.5 rounded-md border border-[#E4E7EC] bg-white text-[#182230] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-[#182230]">Email</label>
                  <input id="email" type="email" placeholder="you@example.com" className="w-full pl-3 pr-4 py-2.5 rounded-md border border-[#E4E7EC] bg-white text-[#182230] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-[#182230]">Subject</label>
                  <input id="subject" type="text" placeholder="How can we help?" className="w-full pl-3 pr-4 py-2.5 rounded-md border border-[#E4E7EC] bg-white text-[#182230] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-[#182230]">Message</label>
                  <textarea id="message" rows={4} placeholder="Your message" className="w-full pl-3 pr-4 py-2.5 rounded-md border border-[#E4E7EC] bg-white text-[#182230] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]"></textarea>
                </div>
                <Button className="w-full bg-[#082B60] text-white py-2.5 rounded-card font-medium hover:bg-[#061B40] transition-colors">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
