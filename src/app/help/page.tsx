export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[36px] font-bold text-[#182230] mb-6">Help Center</h2>
          <p className="text-[#667085] text-lg mb-10">Find answers to common questions about using INVOLVE.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Booking a Service", desc: "How to search, compare, and book professionals." },
              { title: "Payments & Refunds", desc: "Understand payment processing and refund policies." },
              { title: "Account & Profile", desc: "Manage your account settings and preferences." },
              { title: "Verification", desc: "How provider verification works and why it matters." },
              { title: "Safety & Trust", desc: "Our commitment to safe and reliable service experiences." },
              { title: "Disputes", desc: "How to report issues and resolve disputes." },
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
