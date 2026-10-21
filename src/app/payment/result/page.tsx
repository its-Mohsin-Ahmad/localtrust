"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { InvolveLockupHorizontal } from "@/components/brand/involve-logo";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? "success";
  const role = searchParams.get("role") === "provider" ? "provider" : "customer";

  const isSuccess = status === "success";
  const isPending = status === "pending";

  const state = isSuccess
    ? {
        icon: CheckCircle2,
        iconClass: "bg-[#22C55E]/10 text-[#16A34A]",
        title: "Payment successful!",
        desc: "Your Rs. 200 registration fee has been received. Your account is now active.",
        cta: { label: "Go to Dashboard", href: `/${role}/dashboard` },
      }
    : isPending
      ? {
          icon: Clock,
          iconClass: "bg-[#FF6900]/10 text-[#FF6900]",
          title: "Payment pending",
          desc: "We are confirming your bank transfer. Your account will activate within 24 hours.",
          cta: { label: "View Receipt", href: "/payment/receipt/REC-2026-0001" },
        }
      : {
          icon: XCircle,
          iconClass: "bg-[#EF4444]/10 text-[#EF4444]",
          title: "Payment failed",
          desc: "Your payment could not be processed. No money was deducted — please try again.",
          cta: { label: "Try Again", href: `/payment/registration?role=${role}` },
        };

  const Icon = state.icon;

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex flex-col">
      <header className="border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 h-[76px] flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <InvolveLockupHorizontal variant="dark" size="sm" idPrefix="involve-payment-result" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border border-[#E4E7EC] rounded-card p-8 text-center shadow-sm">
          <div className={"mx-auto w-16 h-16 rounded-full flex items-center justify-center " + state.iconClass}>
            <Icon className="w-8 h-8" />
          </div>
          <h1 className="text-[26px] font-bold text-[#182230] mt-6">{state.title}</h1>
          <p className="text-[#667085] text-sm mt-3 leading-relaxed">{state.desc}</p>

          <div className="mt-6 bg-[#F8FAFC] border border-[#E4E7EC] rounded-card p-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-[#667085]">Amount</span>
              <span className="font-semibold text-[#182230]">Rs. 200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Reference</span>
              <span className="font-semibold text-[#182230]">TRX-8821345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#667085]">Status</span>
              <span className="font-semibold capitalize text-[#182230]">{isSuccess ? "Paid" : isPending ? "Pending" : "Failed"}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={state.cta.href}
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-card bg-[#FF6900] text-white font-semibold text-sm hover:bg-[#e55a00] transition-colors"
            >
              {state.cta.label}
            </Link>
            <Link
              href={`/payment/receipt/REC-2026-0001`}
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-card border border-[#E4E7EC] text-[#182230] font-medium text-sm hover:bg-[#F1F3F5] transition-colors"
            >
              Download Receipt
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center text-[#667085] text-sm">
          Loading payment status…
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
