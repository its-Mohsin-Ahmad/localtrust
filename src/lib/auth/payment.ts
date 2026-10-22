/**
 * INVOLVE payment configuration.
 *
 * Rs. 200 PKR one-time registration fee per spec §13.
 * Payment methods are only exposed when genuinely configured via env vars.
 * No payment provider keys are currently present in .env.local, so the
 * payment step gracefully degrades to an honest "not configured" state
 * rather than faking success.
 */

export const REGISTRATION_FEE_PAISA = 200_00;
export const REGISTRATION_FEE_CURRENCY = "PKR";

export interface PaymentMethod {
  id: "easypaisa" | "jazzcash" | "card";
  label: string;
  logo: string;
  configured: boolean;
}

/** Payment methods referenced by the spec. Enabled only when configured. */
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "easypaisa",
    label: "Easypaisa",
    logo: "/images/payments/easypaisa.svg",
    configured: Boolean(process.env.NEXT_PUBLIC_EASYPAISA_CONFIGURED),
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    logo: "/images/payments/jazzcash.svg",
    configured: Boolean(process.env.NEXT_PUBLIC_JAZZCASH_CONFIGURED),
  },
  {
    id: "card",
    label: "Debit / Credit Card",
    logo: "/images/payments/card.svg",
    configured: Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  },
] as const;

export function configuredPaymentMethods(): PaymentMethod[] {
  return PAYMENT_METHODS.filter((m) => m.configured);
}

export function isPaymentConfigured(): boolean {
  return configuredPaymentMethods().length > 0;
}

export function receiptReference(userId: string): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `INV-${userId.slice(0, 8)}-${ts}${rand}`.toUpperCase();
}
