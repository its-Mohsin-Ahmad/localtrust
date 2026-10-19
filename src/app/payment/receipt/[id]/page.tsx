import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { LocalTrustLogo } from "@/components/ui/logo";
import { PrintButtons } from "./print-buttons";

// Static export (GitHub Pages) pre-renders only these receipt ids.
export function generateStaticParams() {
  return [{ id: "REC-2026-0001" }];
}

export default function PaymentReceiptPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <header className="border-b border-[#E4E7EC] bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LocalTrustLogo className="h-8 w-8" />
            <span className="font-bold text-[#082B60]">LocalTrust</span>
          </Link>
          <PrintButtons />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white border border-[#E4E7EC] rounded-card p-8 shadow-sm">
          <div className="flex items-start justify-between border-b border-[#E4E7EC] pb-6">
            <div>
              <h1 className="text-[26px] font-bold text-[#182230]">Payment Receipt</h1>
              <p className="text-[#667085] text-sm mt-1">Receipt #{params.id}</p>
            </div>
            <div className="flex items-center gap-2 text-[#16A34A]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Paid</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#E4E7EC]">
            <div>
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Billed to</p>
              <p className="font-semibold text-[#182230] text-sm">Ali Hamza</p>
              <p className="text-[#667085] text-sm">ali.hamza@example.com</p>
              <p className="text-[#667085] text-sm">Lahore, Pakistan</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Issued by</p>
              <p className="font-semibold text-[#182230] text-sm">LocalTrust (Pvt) Ltd.</p>
              <p className="text-[#667085] text-sm">support@localtrust.pk</p>
              <p className="text-[#667085] text-sm">Date: 15 Oct 2026</p>
            </div>
          </div>

          <table className="w-full text-sm py-4">
            <thead>
              <tr className="text-left text-[#667085] text-xs border-b border-[#E4E7EC]">
                <th className="py-3 font-medium">Description</th>
                <th className="py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E4E7EC]">
                <td className="py-4">
                  <p className="font-medium text-[#182230]">One-time registration fee</p>
                  <p className="text-[#667085] text-xs mt-0.5">Account activation — customer role</p>
                </td>
                <td className="py-4 text-right font-medium text-[#182230]">Rs. 200.00</td>
              </tr>
              <tr>
                <td className="py-3 text-[#667085]">VAT (0%)</td>
                <td className="py-3 text-right text-[#667085]">Rs. 0.00</td>
              </tr>
              <tr>
                <td className="pt-3 font-bold text-[#182230]">Total Paid</td>
                <td className="pt-3 text-right font-bold text-[#FF6900] text-lg">Rs. 200.00</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 bg-[#F8FAFC] border border-[#E4E7EC] rounded-card p-4 text-xs text-[#667085] space-y-1">
            <p>Payment method: Easypaisa — 03XX XXXXXX</p>
            <p>Transaction ID: TRX-8821345</p>
            <p>This receipt was generated automatically and does not require a signature.</p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-card border border-[#E4E7EC] text-[#182230] text-sm font-medium hover:bg-[#F1F3F5] transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/customer/dashboard"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-card bg-[#082B60] text-white text-sm font-medium hover:bg-[#061B40] transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
