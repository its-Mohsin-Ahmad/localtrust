"use client";

import { createClient } from "@/lib/supabase/client";
import { REGISTRATION_FEE_PAISA } from "@/lib/auth/payment";

function supabase() {
  return createClient();
}

export interface DraftRow {
  id: string;
  session_key: string;
  user_id: string | null;
  account_type: "customer" | "provider";
  step: number;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export async function saveRegistrationDraft(args: {
  sessionKey: string;
  accountType: "customer" | "provider";
  step: number;
  data: Record<string, unknown>;
}): Promise<DraftRow | null> {
  const { data, error } = await supabase().rpc("save_registration_draft", {
    p_session_key: args.sessionKey,
    p_account_type: args.accountType,
    p_step: args.step,
    p_data: args.data,
  });
  if (error) throw error;
  const rows = Array.isArray(data) ? data : data ? [data] : [];
  return (rows[0] as DraftRow) ?? null;
}

export async function getRegistrationDraft(args: {
  sessionKey: string;
}): Promise<{ draft: DraftRow | null }> {
  const { data, error } = await supabase().rpc("get_registration_draft", {
    p_session_key: args.sessionKey,
  });
  if (error) throw error;
  const rows = Array.isArray(data) ? data : data ? [data] : [];
  return { draft: (rows[0] as DraftRow) ?? null };
}

export async function deleteRegistrationDraft(args: {
  sessionKey: string;
}): Promise<void> {
  const { error } = await supabase().rpc("delete_registration_draft", {
    p_session_key: args.sessionKey,
  });
  if (error) throw error;
}

export async function signUpWithEmail(args: {
  email: string;
  password: string;
  fullName: string;
  role: "customer" | "provider";
  mobile?: string;
}): Promise<{ userId: string | null; session: boolean; error: string | null }> {
  const { data, error } = await supabase().auth.signUp({
    email: args.email,
    password: args.password,
    options: {
      data: { full_name: args.fullName, role: args.role, mobile: args.mobile },
    },
  });
  if (error) return { userId: null, session: false, error: error.message };
  return {
    userId: data.user?.id ?? null,
    session: Boolean(data.session),
    error: null,
  };
}

export async function signInWithEmailOrMobile(args: {
  identifier: string;
  password: string;
}): Promise<{ error: string | null }> {
  const id = args.identifier.trim();
  if (id.includes("@")) {
    const { error } = await supabase().auth.signInWithPassword({
      email: id,
      password: args.password,
    });
    return { error: error?.message ?? null };
  }
  const digits = id.replace(/\D/g, "");
  const phone = digits.startsWith("92")
    ? `+${digits}`
    : digits.startsWith("0")
    ? `+92${digits.slice(1)}`
    : `+92${digits}`;
  const { error } = await supabase().auth.signInWithPassword({
    phone,
    password: args.password,
  });
  return { error: error?.message ?? null };
}

export async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase().auth.getUser();
  return data.user?.id ?? null;
}


export async function createRegistrationPayment(args: {
  accountType: "customer" | "provider";
  amountPaisa?: number;
  paymentMethod?: string | null;
  receiptReference?: string | null;
  transactionRef?: string | null;
}): Promise<{
  id: string;
  receiptReference: string;
  status: string;
  amountPaisa: number;
  currency: string;
} | null> {
  const { data, error } = await supabase().rpc("create_registration_payment", {
    p_account_type: args.accountType,
    p_amount_paisa: args.amountPaisa ?? REGISTRATION_FEE_PAISA,
    p_currency: "PKR",
    p_payment_method: args.paymentMethod ?? null,
    p_receipt_reference: args.receiptReference ?? null,
    p_transaction_ref: args.transactionRef ?? null,
  });
  if (error) throw error;
  const rows = Array.isArray(data) ? data : data ? [data] : [];
  const r = rows[0] as
    | { id: string; receipt_reference: string; status: string; amount_paisa: number; currency: string }
    | undefined;
  if (!r) return null;
  return {
    id: r.id,
    receiptReference: r.receipt_reference,
    status: r.status,
    amountPaisa: r.amount_paisa,
    currency: r.currency,
  };
}

export async function confirmRegistrationPayment(args: {
  receiptReference: string;
  transactionRef?: string | null;
}): Promise<{ id: string; receiptReference: string; status: string; amountPaisa: number } | null> {
  const { data, error } = await supabase().rpc("confirm_registration_payment", {
    p_receipt_reference: args.receiptReference,
    p_transaction_ref: args.transactionRef ?? null,
  });
  if (error) throw error;
  const rows = Array.isArray(data) ? data : data ? [data] : [];
  const r = rows[0] as
    | { id: string; receipt_reference: string; status: string; amount_paisa: number }
    | undefined;
  if (!r) return null;
  return {
    id: r.id,
    receiptReference: r.receipt_reference,
    status: r.status,
    amountPaisa: r.amount_paisa,
  };
}

export async function getRegistrationPayment(args: {
  receiptReference: string;
}): Promise<Record<string, unknown> | null> {
  const { data, error } = await supabase()
    .from("registration_payments")
    .select("*")
    .eq("receipt_reference", args.receiptReference)
    .maybeSingle();
  if (error) throw error;
  return (data as Record<string, unknown>) ?? null;
}

export async function completeCustomerRegistration(args: {
  sessionKey: string;
  payload: Record<string, unknown>;
}): Promise<{ userId: string; role: string; registrationFeePaid: boolean }> {
  const { data, error } = await supabase().rpc("complete_customer_registration", {
    p_session_key: args.sessionKey,
    p_payload: args.payload,
  });
  if (error) throw error;
  const r = data as { userId?: string; role?: string; registrationFeePaid?: boolean };
  return {
    userId: r?.userId ?? "",
    role: r?.role ?? "customer",
    registrationFeePaid: Boolean(r?.registrationFeePaid),
  };
}

export async function completeProviderRegistration(args: {
  sessionKey: string;
  payload: Record<string, unknown>;
}): Promise<{ userId: string; role: string; registrationFeePaid: boolean }> {
  const { data, error } = await supabase().rpc("complete_provider_registration", {
    p_session_key: args.sessionKey,
    p_payload: args.payload,
  });
  if (error) throw error;
  const r = data as { userId?: string; role?: string; registrationFeePaid?: boolean };
  return {
    userId: r?.userId ?? "",
    role: r?.role ?? "provider",
    registrationFeePaid: Boolean(r?.registrationFeePaid),
  };
}
