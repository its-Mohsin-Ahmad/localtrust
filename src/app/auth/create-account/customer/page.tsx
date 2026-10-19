import Link from "next/link";
import { LocalTrustLogo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CustomerSignupPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/5 flex flex-col justify-center p-8 lg:p-12 bg-[#082B60] text-white rounded-card">
              <LocalTrustLogo className="h-8 w-8 mb-8" />
              <h2 className="text-[32px] font-bold mb-4">Find Help for Your Home</h2>
              <p className="text-[#E4E7EC] text-lg mb-6 leading-relaxed">Create your LocalTrust account to discover local services and manage your bookings.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs shrink-0">+</span> Discover local professionals</li>
                <li className="flex items-start gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs shrink-0">+</span> Compare service options</li>
                <li className="flex items-start gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs shrink-0">+</span> Manage appointments</li>
                <li className="flex items-start gap-3 text-[#E4E7EC]"><span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs shrink-0">+</span> Save favorite providers</li>
              </ul>
              <div className="border-t border-[#E4E7EC]/30 pt-6">
                <div className="flex items-center gap-3 mb-3"><span className="text-[#FF6900] text-lg font-bold">Rs. 200</span><span className="text-[#9CA3AF] text-sm">one-time registration fee</span></div>
                <p className="text-[#E4E7EC]/70 text-sm">Payment is required to activate your account.</p>
              </div>
            </div>
            <div className="lg:w-3/5 flex flex-col justify-center p-8">
              <h2 className="text-[32px] font-bold text-[#182230] mb-2">Create Your Customer Account</h2>
              <p className="text-[#667085] text-sm mb-8">Step 1 of 4 &bull; Personal Details</p>
              <form className="space-y-5 max-w-md">
                <div className="space-y-2"><label htmlFor="fullName" className="block text-sm font-medium text-[#182230]">Full name</label><Input id="fullName" placeholder="e.g. Ali Khan" className="w-full" /></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><div className="space-y-2"><label htmlFor="email" className="block text-sm font-medium text-[#182230]">Email</label><Input id="email" type="email" placeholder="you@example.com" className="w-full" /></div><div className="space-y-2"><label htmlFor="phone" className="block text-sm font-medium text-[#182230]">Mobile</label><Input id="phone" type="tel" placeholder="03XX-XXXXXXX" className="w-full" /></div></div>
                <div className="space-y-2"><label htmlFor="password" className="block text-sm font-medium text-[#182230]">Password</label><Input id="password" type="password" placeholder="Min. 8 characters" className="w-full" /></div>
                <div className="space-y-2"><label htmlFor="confirmPassword" className="block text-sm font-medium text-[#182230]">Confirm password</label><Input id="confirmPassword" type="password" placeholder="Repeat password" className="w-full" /></div>
                <div className="space-y-2"><label htmlFor="city" className="block text-sm font-medium text-[#182230]">City</label><Input id="city" placeholder="Lahore" className="w-full" /></div>
                <div className="flex items-start gap-2"><input id="terms" type="checkbox" className="mt-0.5 rounded border-[#E4E7EC] text-[#082B60] focus:ring-[#FF6900]" /><label htmlFor="terms" className="text-sm text-[#667085] leading-relaxed">I accept the <Link href="/terms" className="text-[#FF6900] hover:underline">Terms</Link> and <Link href="/privacy" className="text-[#FF6900] hover:underline">Privacy Policy</Link></label></div>
                <Button className="w-full bg-[#082B60] text-white py-3 rounded-card font-medium hover:bg-[#061B40] transition-colors">Continue to Payment</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
