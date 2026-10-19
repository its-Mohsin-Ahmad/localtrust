export default function FAQPage() {
  const faqs = [
    { q: "How do I book a service on LocalTrust?", a: "Search for a service, compare professionals, and request a booking — all in one place." },
    { q: "Is the registration fee refundable?", a: "The one-time Rs. 200 registration fee covers account activation and is non-refundable once your account is verified." },
    { q: "Are providers verified?", a: "Providers go through a separate verification process. Payment does not equal verification — verified badges are only awarded after checks are completed." },
    { q: "How do I pay for services?", a: "Payments are handled securely through the platform. You can pay after the service is completed and verified." },
    { q: "Can I reschedule or cancel a booking?", a: "Yes, you can reschedule or cancel a booking up to 24 hours before the scheduled time." },
    { q: "How do I leave a review?", a: "After a completed booking, you can rate and review the professional from your bookings page." },
  ];
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[36px] font-bold text-[#182230] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white border border-[#E4E7EC] rounded-card p-4">
                <summary className="flex items-center justify-between cursor-pointer font-medium text-[#182230] list-none">
                  {faq.q}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#667085]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="mt-2 text-[#667085] text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
