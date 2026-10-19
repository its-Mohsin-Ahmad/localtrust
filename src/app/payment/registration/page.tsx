"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, Smartphone, Building2 } from "lucide-react";
import { LocalTrustLogo } from "@/components/ui/logo";

const METHODS = [
  { id: "card", name: "Debit / Credit Card", desc: "Visa, Mastercard — processed securely", icon: CreditCard },
  { id: "easypaisa", name: "Easypaisa", desc: "Pay instantly from your mobile wallet", icon: Smartphone },
  { id: "jazzcash", name: "JazzCash", desc: "Pay instantly from your mobile wallet", icon: Smartphone },
  { id: "bank", name: "Bank Transfer", desc: "IBAN transfer — confirmed within 24h", icon: Building2 },
] as const;

function RegistrationPaymentContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "provider" ? "provider" : "customer";
  const [method, setMethod] = useState<string>("easypaisa");
  const [processing, setProcessing] = useState(false);

  function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    // Payment gateway integration point — redirect to result for now.
    window.location.href = "/payment/result?status=success&role=" + role;
  }

  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <header className="border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LocalTrustLogo className="h-8 w-8" />
            <span className="font-bold text-[#082B60]">LocalTrust</span>
          </Link>
          <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">Secure Checkout</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold text-[#182230]">Registration Fee Payment</h1>
          <p className="text-[#667085] mt-1">Complete your {role} account activation with a one-time payment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-[#E4E7EC] rounded-card p-6">
            <h2 className="font-bold text-[#182230] mb-4">Choose a payment method</h2>
            <form onSubmit={handlePay} className="space-y-3">
              {METHODS.map((m) => (
                <label
                  key={m.id}
                  className={
                    "flex items-start gap-3 p-4 rounded-card border cursor-pointer transition-colors " +
                    (method === m.id
                      ? "border-[#FF6900] bg-[#FF6900]/5"
                      : "border-[#E4E7EC] hover:border-[#FF6900]/40")
                  }
                >
                  <input
                    type="radio"
                    name="method"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="mt-1 accent-[#FF6900]"
                  />
                  <span className="flex items-center justify-center w-9 h-9 rounded-md bg-[#F1F3F5] text-[#082B60] shrink-0">
                    <m.icon className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block font-semibold text-sm text-[#182230]">{m.name}</span>
                    <span className="block text-xs text-[#667085] mt-0.5">{m.desc}</span>
                  </span>
                </label>
              ))}

              <div className="pt-2">
                <label htmlFor="reference" className="block text-sm font-medium text-[#182230] mb-1.5">
                  Transaction / reference number <span className="text-[#667085] font-normal">(optional)</span>
                </label>
                <input
                  id="reference"
                  type="text"
                  placeholder="e.g. TRX-8821345"
                  className="w-full pl-3 pr-4 py-2.5 rounded-md border border-[#E4E7EC] bg-white text-[#182230] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-[#FF6900] text-white font-semibold text-sm hover:bg-[#e55a00] transition-colors disabled:opacity-60"
              >
                {processing ? "Processing…" : "Pay Rs. 200"}
              </button>
              <p className="text-xs text-[#667085] text-center">
                Payments are encrypted end-to-end. By paying you agree to our{" "}
                <Link href="/terms" className="text-[#FF6900] hover:underline">Terms</Link>.
              </p>
            </form>
          </div>

          <div className="bg-white border border-[#E4E7EC] rounded-card p-6 h-fit">
            <h2 className="font-bold text-[#182230] mb-4">Order summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#667085]">Account type</span>
                <span className="font-medium text-[#182230] capitalize">{role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#667085]">Registration fee</span>
                <span className="font-medium text-[#182230]">Rs. 200</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#667085]">VAT (0%)</span>
                <span className="font-medium text-[#182230]">Rs. 0</span>
              </div>
              <div className="border-t border-[#E4E7EC] pt-3 flex items-center justify-between">
                <span className="font-bold text-[#182230]">Total</span>
                <span className="font-bold text-[#FF6900] text-lg">Rs. 200</span>
              </div>
            </div>
            <ul className="mt-5 space-y-2.5 text-xs text-[#667085]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                One-time, non-refundable activation fee
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                Account activated within minutes
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                Digital receipt sent to your email
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function RegistrationPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center text-[#667085] text-sm">
          Loading checkout…
        </div>
      }
    >
      <RegistrationPaymentContent />
    </Suspense>
  );
}

