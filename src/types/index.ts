export type UserRole = "customer" | "provider" | "admin";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageKey?: string | null;
  providerCount?: number;
  parentId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Location {
  id: string;
  region: string;
  city: string;
  locality?: string | null;
  slug: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  businessName?: string | null;
  fullName?: string | null;
  primaryCategoryId?: string | null;
  description?: string | null;
  phone?: string | null;
  city?: string | null;
  region?: string | null;
  serviceAreas?: string[] | null;
  hourlyRate?: number | null; // paisa
  fixedPrice?: number | null; // paisa
  startingPrice?: number | null; // paisa
  inspectionFee?: number | null; // paisa
  rating?: number | null;
  reviewCount?: number | null;
  verified?: boolean;
  avatarUrl?: string | null;
  logoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  providerId: string;
  serviceId?: string | null;
  categoryId?: string | null;
  status: string;
  location?: string | null;
  scheduledAt?: string | null;
  description?: string | null;
  amount?: number | null; // paisa
  createdAt?: string;
  updatedAt?: string;
}

export interface RegistrationPayment {
  id: string;
  userId: string;
  accountType: UserRole;
  amountPaisa: number;
  currency: string;
  status: "pending" | "processing" | "succeeded" | "failed" | "cancelled" | "refund_pending" | "refunded";
  paymentMethod?: string | null;
  transactionRef?: string | null;
  receiptReference: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  providerId: string;
  rating: number;
  comment?: string | null;
  createdAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body?: string | null;
  read: boolean;
  createdAt?: string;
}

export interface Conversation {
  id: string;
  bookingId?: string | null;
  participants: string[];
  lastMessageAt?: string | null;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body?: string | null;
  createdAt?: string;
}

export interface DashboardStats {
  totalBookings: number;
  upcomingAppointments: number;
  pendingRequests: number;
  completedJobs: number;
}
