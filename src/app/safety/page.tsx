const SAFETY_ITEMS = [
  {
    title: "Provider verification",
    desc: "We verify identity and credentials so you know who is arriving at your door.",
  },
  {
    title: "Reviews and ratings",
    desc: "Every completed job is reviewed, keeping the community honest and transparent.",
  },
  {
    title: "Secure payments",
    desc: "Payments are processed through secure, encrypted channels end to end.",
  },
  {
    title: "Customer support",
    desc: "Our support team is ready to help resolve disputes and answer questions.",
  },
  {
    title: "Reporting concerns",
    desc: "Report any issue in-app and our moderation team will act quickly.",
  },
  {
    title: "Privacy protection",
    desc: "Your personal data stays private and is never sold to third parties.",
  },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-[36px] font-bold text-[#182230] mb-6">Safety &amp; Trust</h2>
          <p className="text-[#667085] text-lg mb-10">
            Learn how INVOLVE keeps you safe while using our platform.
          </p>
          <div className="space-y-4">
            {SAFETY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-card border border-[#E4E7EC] shadow-sm flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#082B60]/10 text-[#082B60] flex items-center justify-center text-xs shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-[#182230] text-sm">{item.title}</h3>
                  <p className="text-[#667085] text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

