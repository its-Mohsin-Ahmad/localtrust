"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/auth/AuthShell";
import { PromoPanel } from "@/components/auth/PromoPanel";
import { BenefitRow } from "@/components/auth/AuthPanels";
import { Users, Briefcase } from "lucide-react";

type Role = "customer" | "provider";

const ROLES: { value: Role; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    value: "customer",
    label: "Customer",
    desc: "Book trusted professionals for your home, office, or personal needs.",
    icon: <Users className="h-5 w-5" />,
  },
  {
    value: "provider",
    label: "Service Provider",
    desc: "Offer your services, set your schedule, and grow your income.",
    icon: <Briefcase className="h-5 w-5" />,
  },
];

export default function CreateAccountPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<"customer" | "provider" | null>(null);
  const [loading, setLoading] = useState(false);

  const choose = async (role: "customer" | "provider") => {
    setLoading(true);
    setSelected(role);
    await new Promise((r) => setTimeout(r, 400));
    router.push(`/auth/create-account/${role}`);
    router.refresh();
    setLoading(false);
  };

  return (
    <AuthShell
      promo={
        <PromoPanel
          logoVariant="light"
          headingLines={[
            { text: "Join INVOLVE" },
            { text: "and Get Started Today.", orange: true },
          ]}
          supportingText={
            "Choose whether you are looking for services or want to offer your skills to the local community."
          }
          benefits={[
            {
              icon: <ShieldIcon />,
              heading: "Verified Network",
              description: "Professionals and customers you can trust.",
            },
            {
              icon: <MapIcon />,
              heading: "Across Pakistan",
              description: "Major cities and neighbourhoods covered.",
            },
            {
              icon: <StarIcon />,
              heading: "Simple Payments",
              description: "One-time registration fee of Rs. 200 PKR.",
            },
          ]}
          photoAsset="authSignIn"
          photoAlt="INVOLVE community of customers and professionals"
          slogan="Better Services, Together."
        />
      }
      className="bg-[#F8FAFC]"
    >
      <div className="flex w-full flex-col items-center justify-center pt-6">
        <h2 className="text-[32px] font-bold text-[#182230] mb-2">Create your account</h2>
        <p className="text-[#52688D] text-sm mb-10">
          Join INVOLVE and connect with your local community.
        </p>
        <div className="grid w-full max-w-lg grid-cols-1 gap-4 md:grid-cols-2">
          {ROLES.map((r) => {
            const chosen = selected === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => choose(r.value)}
                disabled={loading}
                className={`flex flex-col items-center gap-3 rounded-xl border p-8 text-left transition-all ${
                  chosen
                    ? "border-[#061B40] bg-[#EDF5FF] shadow-[0_8px_24px_rgba(6,27,64,0.10)]"
                    : "border-[#D8E2EF] bg-white hover:border-[#082B60]/50"
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  chosen ? "bg-[#FF6900] text-white" : "bg-[#F1F3F5] text-[#061B40]"
                }`}>
                  {r.icon}
                </div>
                <span className="font-semibold text-[#182230]">{r.label}</span>
                <span className="text-xs text-[#52688D] leading-relaxed text-center">{r.desc}</span>
                {chosen && (
                  <div className="mt-2 h-2 w-full rounded-full bg-[#D8E2EF]">
                    <div className="h-full w-1/2 bg-[#FF6900] rounded-full animate-pulse" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {loading && (
          <p className="mt-6 text-xs text-[#52688D]">Preparing your registration…</p>
        )}
        <p className="mt-8 text-center text-sm text-[#52688D]">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="font-medium text-[#FF6900] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l4 8a4 4 0 0 1-1.5 6.5L12 20l-4.5-3.5A4 4 0 0 1 8 10l4-8z" />
    </svg>
  );
}
function MapIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" x2="8" y1="3" y2="21" />
      <line x1="16" x2="16" y1="3" y2="21" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
