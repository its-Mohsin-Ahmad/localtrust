const SECTIONS = [
  {
    title: "1. Fee Overview",
    body: "INVOLVE charges a one-time registration fee of Rs. 200 to activate a new account. The fee covers account creation, identity checks, and access to the platform. The fee is the same for customers and providers.",
  },
  {
    title: "2. Accepted Payment Methods",
    body: "You can pay using a debit or credit card, Easypaisa, JazzCash, or a bank transfer to our published IBAN. Bank transfers are confirmed within 24 hours of clearing.",
  },
  {
    title: "3. When Payment Is Due",
    body: "Payment is completed during the account creation flow. Your account is activated only after the payment is confirmed. Provider accounts must complete payment before they can publish services.",
  },
  {
    title: "4. Receipts & Records",
    body: "A digital receipt is generated for every successful payment and is available under Payments in your dashboard. Keep this receipt for your records.",
  },
  {
    title: "5. Failed & Pending Payments",
    body: "If a payment fails, no money is deducted and you can retry safely. Pending bank transfers remain pending until cleared; your account activates automatically afterwards.",
  },
  {
    title: "6. Fraud Prevention",
    body: "All payments are processed through encrypted channels. INVOLVE never asks for your PIN, CVV, or full card number over the phone or in chat.",
  },
];

export default function RegistrationPaymentPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[36px] font-bold text-[#182230] mb-6">Registration Payment Policy</h2>
          <p className="text-[#667085] text-lg mb-10">How the one-time Rs. 200 registration fee works on INVOLVE.</p>
          <div className="space-y-6">
            {SECTIONS.map((s) => (
              <div key={s.title} className="bg-white p-6 rounded-card border border-[#E4E7EC] shadow-sm">
                <h3 className="font-bold text-[#182230] text-base mb-2">{s.title}</h3>
                <p className="text-[#667085] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#667085] text-xs mt-8">Last updated: 15 Oct 2026. Questions? Contact support@involve.pk.</p>
        </div>
      </section>
    </div>
  );
}
