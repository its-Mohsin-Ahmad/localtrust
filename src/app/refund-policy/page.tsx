const SECTIONS = [
  {
    title: "1. Registration Fee",
    body: "The one-time Rs. 200 registration fee is non-refundable once your account has been verified. It covers account activation and identity checks that have already been performed.",
  },
  {
    title: "2. Service Payments",
    body: "If a provider cancels or fails to complete a booked service, the amount for that booking is refunded to your original payment method within 5–7 working days.",
  },
  {
    title: "3. Duplicate Payments",
    body: "If you were charged twice for the same transaction, contact support with both transaction IDs. Duplicates are refunded in full within 3 working days.",
  },
  {
    title: "4. Disputed Charges",
    body: "Raise a dispute from your Payments dashboard within 14 days of the charge. Our team reviews evidence from both parties and issues a decision within 7 working days.",
  },
  {
    title: "5. How Refunds Are Paid",
    body: "Refunds are issued to the original payment method. Bank transfer refunds are sent to the IBAN used for the payment. Easypaisa and JazzCash refunds return to the wallet.",
  },
  {
    title: "6. Non-Refundable Situations",
    body: "Completed services, no-shows by the customer, and charges related to policy abuse are not eligible for refunds.",
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[36px] font-bold text-[#182230] mb-6">Refund Policy</h2>
          <p className="text-[#667085] text-lg mb-10">When and how refunds are issued on LocalTrust.</p>
          <div className="space-y-6">
            {SECTIONS.map((s) => (
              <div key={s.title} className="bg-white p-6 rounded-card border border-[#E4E7EC] shadow-sm">
                <h3 className="font-bold text-[#182230] text-base mb-2">{s.title}</h3>
                <p className="text-[#667085] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#667085] text-xs mt-8">Last updated: 15 Oct 2026. Questions? Contact support@localtrust.pk.</p>
        </div>
      </section>
    </div>
  );
}
