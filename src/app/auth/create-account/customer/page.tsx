"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Mail, MapPin, Lock, Phone, User, CreditCard, ShieldCheck, CheckCircle, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthShell } from "@/components/auth/AuthShell";
import { PromoPanel } from "@/components/auth/PromoPanel";
import { Field, PasswordField } from "@/components/auth/FormControls";
import { Stepper, StepNav } from "@/components/auth/Stepper";
import { InfoPanel, PaymentNotice, SecurityNotice, SocialButtons, Divider } from "@/components/auth/AuthPanels";
import { cn } from "@/lib/utils";
import { customerStep1Schema } from "@/lib/auth/validation";
import { allCities } from "@/lib/auth/locations";
import {
  saveRegistrationDraft,
  getRegistrationDraft,
  signUpWithEmail,
  getCurrentUserId,
  createRegistrationPayment,
  confirmRegistrationPayment,
  completeCustomerRegistration,
  deleteRegistrationDraft,
} from "@/lib/auth/actions";
import { isPaymentConfigured, configuredPaymentMethods } from "@/lib/auth/payment";

const STEP_KEY = "involve_reg_customer_session";

function sessionKey() {
  let key = localStorage.getItem(STEP_KEY);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(STEP_KEY, key);
  }
  return key;
}

const CUSTOMER_STEPS = [
  { key: "personal", label: "Personal Details" },
  { key: "location", label: "Location & Area" },
  { key: "payment", label: "Payment" },
  { key: "complete", label: "Complete" },
] as const;

type CustomerForm = {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  city: string;
};

export default function CustomerSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "succeeded" | "failed">("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const keyRef = useRef<string | null>(null);

  const [form, setForm] = useState<CustomerForm>({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "", city: "",
  });

  useEffect(() => {
    keyRef.current = sessionKey();
    void loadDraft();
  }, []);

  async function loadDraft() {
    if (!keyRef.current) return;
    try {
      const { draft } = await getRegistrationDraft({ sessionKey: keyRef.current });
      if (draft?.data && typeof draft.data === "object") {
        const data = draft.data as Partial<CustomerForm>;
        setForm((f) => ({ ...f, ...data }));
        setStep(Math.min(Math.max(draft.step || 1, 1), 4));
      }
    } catch { /* best-effort */ }
  }

  async function saveDraft(currentStep: number) {
    if (!keyRef.current) return;
    try {
      await saveRegistrationDraft({
        sessionKey: keyRef.current, accountType: "customer", step: currentStep, data: form,
      });
    } catch { /* best-effort */ }
  }

  const isLast = step === CUSTOMER_STEPS.length;

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleNext = useCallback(async () => {
    setPaymentError(null);
    if (step === 1) {
      try { customerStep1Schema.parse({ ...form, terms: true }); }
      catch (err: any) { setPaymentError(err.errors?.[0]?.message ?? "Please complete all required fields."); return; }
    } else if (step === 2) {
      if (!form.city) { setPaymentError("Please select a city or area."); return; }
    }
    await saveDraft(step);
    if (isLast) return;
    setStep(step + 1);
  }, [step, form, isLast]);

  const handlePayment = async () => {
    setLoading(true); setPaymentStatus("processing"); setPaymentError(null);
    try {
      await saveDraft(3);
      // Ensure we have an authenticated user (sign up if needed).
      let userId = await getCurrentUserId();
      if (!userId) {
        const su = await signUpWithEmail({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          role: "customer",
          mobile: form.mobile,
        });
        if (su.error) throw new Error(su.error);
        userId = su.userId;
        if (!su.session) {
          setPaymentStatus("idle");
          setPaymentError("Please confirm your email address, then return to complete payment.");
          return;
        }
      }
      if (!userId) throw new Error("Sign-up did not return a user.");

      // Create pending payment record.
      const payment = await createRegistrationPayment({
        accountType: "customer",
        paymentMethod: "bank",
      });
      if (!payment) throw new Error("Could not create payment record.");

      // Sandbox / auto-confirm when a real gateway is not configured.
      const sandbox = process.env.NEXT_PUBLIC_PAYMENT_SANDBOX === "1";
      let succeeded = false;
      if (sandbox) {
        const confirmed = await confirmRegistrationPayment({
          receiptReference: payment.receiptReference,
        });
        succeeded = confirmed?.status === "succeeded";
      }

      await completeCustomerRegistration({
        sessionKey: keyRef.current!,
        payload: {
          fullName: form.fullName,
          mobile: form.mobile,
          city: form.city,
          region: "",
          addressLine: "",
          paymentSucceeded: succeeded,
          paymentReceiptReference: payment.receiptReference,
        },
      });

      await deleteRegistrationDraft({ sessionKey: keyRef.current! }).catch(() => {});
      localStorage.removeItem(STEP_KEY);

      setPaymentStatus(succeeded ? "succeeded" : "idle");
      setStep(4);
    } catch (err: any) {
      setPaymentStatus("failed");
      setPaymentError(err?.message ?? "Payment could not be processed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell
      promo={
        <PromoPanel
          logoVariant="light"
          headingLines={[
            { text: "Customer" },
            { text: "and Get the Best Services Near You.", orange: true },
          ]}
          supportingText={
            "Book trusted professionals for your home, office, or personal needs — quickly, easily, and safely."
          }
          benefits={[
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              heading: "Verified Professionals",
              description: "Background-checked and trusted.",
            },
            {
              icon: <Clock className="h-5 w-5" />,
              heading: "Save Time",
              description: "Book in minutes, not hours.",
            },
            {
              icon: <ShieldCheck className="h-5 w-5" />,
              heading: "Safe & Secure",
              description: "Your safety and satisfaction is our priority.",
            },
          ]}
          photoAsset="authCustomer"
          photoAlt="Pakistani woman with a smartphone outdoors in an urban setting"
          slogan="Trusted Services. Better Living."
        />
      }
      className="bg-[#F8FAFC]"
    >
      <div className="flex w-full flex-col items-center justify-center pt-4">
        <h2 className="text-[32px] font-bold text-[#182230] mb-1">
          Create Your Customer Account
        </h2>
        <p className="text-[#52688D] text-sm mb-8 leading-relaxed">
          Join INVOLVE and access trusted professionals in your area.
        </p>
        <Stepper steps={CUSTOMER_STEPS as unknown as { key: string; label: string }[]} current={step} />
        <div className="mt-8 flex w-full max-w-[620px] flex-col gap-4">
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); void handleNext(); }} className="space-y-4">
              <Field
                id="fullName"
                icon="user"
                label="Full Name *"
                placeholder="Enter your full name."
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <Field
                id="email"
                icon="mail"
                label="Email Address *"
                placeholder="Enter your email address."
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Field
                id="mobile"
                icon="phone"
                label="Mobile Number *"
                placeholder="Enter your mobile number."
                type="tel"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />
              <PasswordField
                id="password"
                label="Password *"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm Password *"
                value={form.confirmPassword}
                onChange={(v) => setForm({ ...form, confirmPassword: v })}
              />
              <div className="flex items-start gap-2">
                <input id="terms" type="checkbox" className="mt-0.5 rounded border-[#D8E2EF] text-[#061B40] focus:ring-[#FF6900]" />
                <label htmlFor="terms" className="text-sm text-[#52688D] leading-relaxed">
                  I agree to the <Link href="/terms" className="text-[#FF6900] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#FF6900] hover:underline">Privacy Policy</Link>
                </label>
              </div>
              {paymentError && (
                <div role="alert" className="rounded-lg border border-[#DC2626] bg-red-50 px-4 py-3 text-sm text-[#DC2626]">{paymentError}</div>
              )}
              <StepNav onContinue={handleNext} label="Next Step" loading={loading} />
            </form>
          )}
          {step === 2 && (
            <div className="space-y-6">
              <Field as="select" id="city" icon="mapPin" label="City / Preferred Service Area *" placeholder="Select your city or preferred area." value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                {allCities().map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}, {c.region}</option>
                ))}
              </Field>
              <InfoPanel icon={<CreditCard className="h-5 w-5" />} title="One-time registration fee: Rs. 200 PKR" description="This fee is required to activate your customer account." />
              {paymentError && (
                <div role="alert" className="rounded-lg border border-[#DC2626] bg-red-50 px-4 py-3 text-sm text-[#DC2626]">{paymentError}</div>
              )}
              <StepNav onBack={handleBack} onContinue={handleNext} loading={loading} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#182230]">Registration payment</h3>
              <p className="text-sm text-[#52688D]">
                A one-time fee of <span className="font-semibold text-[#FF6900]">Rs. 200 PKR</span> activates your customer account.
              </p>
              <PaymentNotice />
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#182230]">Payment method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button className="flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors border-[#D8E2EF] bg-white hover:border-[#FF6900]" onClick={() => void handlePayment()} disabled={loading}>
                    <span className="text-sm text-[#182230]">Easypaisa</span>
                    <span className="text-xs text-[#52688D]">Mobile wallet</span>
                  </button>
                  <button className="flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors border-[#D8E2EF] bg-white hover:border-[#FF6900]" onClick={() => void handlePayment()} disabled={loading}>
                    <span className="text-sm text-[#182230]">JazzCash</span>
                    <span className="text-xs text-[#52688D]">Mobile wallet</span>
                  </button>
                </div>
                <p className="text-xs text-[#52688D]">Easypaisa and JazzCash are shown once the corresponding payment provider is configured by the administrator.</p>
              </div>
              {paymentStatus === "processing" && (
                <div className="flex items-center gap-2 text-sm text-[#52688D]"><ArrowRight className="h-4 w-4 animate-spin" /> Processing payment…</div>
              )}
              {paymentStatus === "failed" && paymentError && (
                <div role="alert" className="rounded-lg border border-[#DC2626] bg-red-50 px-4 py-3 text-sm text-[#DC2626]">{paymentError}</div>
              )}
              <StepNav onBack={handleBack} onContinue={handlePayment} label="Pay Rs. 200" loading={loading || paymentStatus === "processing"} disabled={paymentStatus === "processing"} />
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#15965A]/10 text-[#15965A] mx-auto mb-6"><CheckCircle className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold text-[#182230] mb-2">Account created</h3>
              <p className="text-[#52688D] text-sm mb-6 max-w-xs mx-auto leading-relaxed">{paymentStatus === "succeeded" ? "Your customer account is active. You can now book services in your area." : "Your account has been created. Complete the registration payment to activate it."}</p>
              <Button onClick={() => router.push("/customer")} className="w-full bg-[#061B40] text-white py-3 font-medium hover:bg-[#04132F]">
                Go to dashboard <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
          {/* CUSTOMER_PART3 */}
        </div>
      </div>
    </AuthShell>
  );
}

