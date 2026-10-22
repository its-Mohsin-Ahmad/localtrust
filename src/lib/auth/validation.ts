/**
 * INVOLVE authentication & registration validation schemas.
 *
 * All schemas use Zod and mirror the business rules in the recovered
 * master specification (Sections 4-7):
 * - Rs. 200 one-time registration fee
 * - Pakistan +92 mobile default
 * - Password strength: min 8 chars
 * - Role-scoped fields (customer vs provider)
 */

import * as z from "zod";

/** Shared password rules per spec §5/§7: min 8 characters. */
const password = z
  .string({ required_error: "Password is required." })
  .min(8, "Password must be at least 8 characters.");

const confirmPassword = z
  .string({ required_error: "Please confirm your password." });

/** Pakistan country code default per spec. */
const PAKISTAN_COUNTRY_CODE = "+92";

/** Mobile: allow digits, spaces, +, -, (, ). Basic E.164-ish validation. */
const mobile = z
  .string({ required_error: "Mobile number is required." })
  .min(7, "Mobile number is too short.")
  .max(20, "Mobile number is too long.")
  .refine(
    (v) => /^\+?[\d\s\-()]{7,20}$/.test(v),
    "Enter a valid mobile number."
  );

/** Accept email or mobile for sign-in. */
const emailOrMobile = z
  .string({ required_error: "Email or mobile number is required." })
  .min(3, "Enter a valid email or mobile number.");

export const signInSchema = z.object({
  emailOrMobile,
  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
});

export type SignInInput = z.infer<typeof signInSchema>;

/** Customer registration - Step 1 (Personal Details) per spec §7. */
export const customerStep1Schema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(2, "Full name is too short.")
    .max(100, "Full name is too long."),
  email: z
    .string({ required_error: "Email address is required." })
    .email("Enter a valid email address."),
  mobile: mobile,
  password,
  confirmPassword: z.string(),
  city: z
    .string({ required_error: "Please select a city or area." })
    .min(1, "Please select a city or area."),
  terms: z
    .boolean()
    .refine((v) => v === true, "You must agree to the Terms of Service and Privacy Policy.")
    .default(false),
})
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type CustomerStep1Input = z.infer<typeof customerStep1Schema>;

/** Customer registration - Step 2 (Location & Area) per spec §7. */
export const customerStep2Schema = z.object({
  city: z.string().min(1, "Please select a city."),
  area: z.string().optional(),
  addressLine: z.string().optional(),
});

export type CustomerStep2Input = z.infer<typeof customerStep2Schema>;

/** Provider registration - Step 1 (Basic Details) per spec §5. */
export const providerStep1Schema = z.object({
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(2, "Full name is too short.")
    .max(100, "Full name is too long."),
  businessName: z.string().optional(),
  email: z
    .string({ required_error: "Email address is required." })
    .email("Enter a valid email address."),
  mobile: mobile,
  password,
  confirmPassword: z.string(),
  primaryCategory: z
    .string({ required_error: "Please select a service category." })
    .min(1, "Please select a service category."),
  city: z
    .string({ required_error: "Please select a city or area." })
    .min(1, "Please select a city or area."),
  terms: z
    .boolean()
    .refine((v) => v === true, "You must agree to the Terms of Service and Privacy Policy.")
    .default(false),
})
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ProviderStep1Input = z.infer<typeof providerStep1Schema>;

/** Provider registration - Step 2 (Business Information) per spec §6. */
export const providerStep2Schema = z.object({
  businessName: z.string().optional(),
  yearsOfExperience: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+$/.test(v), "Enter a valid number of years."),
  biography: z.string().max(1000, "Biography is too long.").optional(),
  businessAddress: z.string().optional(),
  serviceMode: z
    .enum(["individual", "registered_business", "team"])
    .optional(),
  website: z.string().url("Enter a valid website URL.").optional().or(z.literal("")),
  licenseNumber: z.string().optional(),
});

export type ProviderStep2Input = z.infer<typeof providerStep2Schema>;

/** Provider registration - Step 3 (Services & Areas) per spec §6. */
export const providerStep3Schema = z.object({
  serviceCategories: z.array(z.string()).min(1, "Select at least one service category."),
  serviceDescription: z.string().max(1000).optional(),
  citiesServed: z.array(z.string()).min(1, "Select at least one city."),
  startingPrice: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+$/.test(v), "Enter a valid price."),
  availabilityNotes: z.string().optional(),
});

export type ProviderStep3Input = z.infer<typeof providerStep3Schema>;
