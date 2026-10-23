/**
 * INVOLVE centralized image manifest.
 * Development uses Unsplash photography. Replace with project-owned assets before production.
 */

import type { ImageAsset } from "@/types";

export const IMAGE_DOMAINS = ["images.unsplash.com", "images.pexels.com"];

export const images: Record<string, ImageAsset> = {
  homeHeroRepair: {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    alt: "Professional repairing a kitchen faucet for a customer",
    width: 1600,
    height: 900,
    priority: true,
  },
  homeHeroProfessionals: {
    src: "https://images.unsplash.com/photo-1581579361567-9734d9d0a217?auto=format&fit=crop&w=1600&q=80",
    alt: "Skilled tradespeople performing real work in a home environment",
    width: 1600,
    height: 900,
  },
  homeHeroCustomer: {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    alt: "Customer discussing a job with a professional",
    width: 1600,
    height: 900,
  },
  homeHeroBusiness: {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1600&q=80",
    alt: "Professional tradesperson at work with tools",
    width: 1600,
    height: 900,
  },

  categoryPlumbing: {
    src: "https://images.unsplash.com/photo-1581091076141-2f672b44312b?auto=format&fit=crop&w=600&q=80",
    alt: "Plumber working on pipes and a tap",
    width: 600,
    height: 600,
  },
  categoryElectrical: {
    src: "https://images.unsplash.com/photo-1622569306802-250006e19561?auto=format&fit=crop&w=600&q=80",
    alt: "Electrician installing lighting fixture",
    width: 600,
    height: 600,
  },
  categoryCleaning: {
    src: "https://images.unsplash.com/photo-1581539327726-384e0b64ad66?auto=format&fit=crop&w=600&q=80",
    alt: "Professional cleaning a home interior",
    width: 600,
    height: 600,
  },
  categoryACRepair: {
    src: "https://images.unsplash.com/photo-1592918434891-248b1051e86f?auto=format&fit=crop&w=600&q=80",
    alt: "Technician servicing an AC unit",
    width: 600,
    height: 600,
  },
  categoryCarpentry: {
    src: "https://images.unsplash.com/photo-1584769280279-5b7440764460?auto=format&fit=crop&w=600&q=80",
    alt: "Carpenter working with wood",
    width: 600,
    height: 600,
  },
  categoryPainting: {
    src: "https://images.unsplash.com/photo-1509369747704-a0993aa39e9e?auto=format&fit=crop&w=600&q=80",
    alt: "Painter working on an interior wall",
    width: 600,
    height: 600,
  },
  categoryMechanic: {
    src: "https://images.unsplash.com/photo-1552506112-a9311a5ba6b0?auto=format&fit=crop&w=600&q=80",
    alt: "Mechanic inspecting a vehicle engine",
    width: 600,
    height: 600,
  },
  categoryTutoring: {
    src: "https://images.unsplash.com/photo-1523240796612-82004a222f0c?auto=format&fit=crop&w=600&q=80",
    alt: "Tutor helping a student study",
    width: 600,
    height: 600,
  },
  categoryGardening: {
    src: "https://images.unsplash.com/photo-1624558666603-9488873350e1?auto=format&fit=crop&w=600&q=80",
    alt: "Gardener maintaining plants",
    width: 600,
    height: 600,
  },
  categoryComputerRepair: {
    src: "https://images.unsplash.com/photo-1526348376597-530d0594ca96?auto=format&fit=crop&w=600&q=80",
    alt: "Technician repairing a computer",
    width: 600,
    height: 600,
  },
  categorySolar: {
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
    alt: "Technician working on solar panels",
    width: 600,
    height: 600,
  },
  categoryMoving: {
    src: "https://images.unsplash.com/photo-1611781462273-3e0b1f6527f0?auto=format&fit=crop&w=600&q=80",
    alt: "Professionals safely handling furniture while moving",
    width: 600,
    height: 600,
  },
  categoryPestControl: {
    src: "https://images.unsplash.com/photo-1579783995247-ea217073282e?auto=format&fit=crop&w=600&q=80",
    alt: "Pest control technician treating a home",
    width: 600,
    height: 600,
  },
  categoryBeauty: {
    src: "https://images.unsplash.com/photo-1522337350908-16c359ad0cb5?auto=format&fit=crop&w=600&q=80",
    alt: "Beauty and personal care professional",
    width: 600,
    height: 600,
  },
  categoryLaundry: {
    src: "https://images.unsplash.com/photo-1612601824311-a0138641da77?auto=format&fit=crop&w=600&q=80",
    alt: "Laundry and ironing service",
    width: 600,
    height: 600,
  },
  categoryWaterPump: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    alt: "Water pump and tank technician",
    width: 600,
    height: 600,
  },
  categoryCCTV: {
    src: "https://images.unsplash.com/photo-1557840135-0244998c2475?auto=format&fit=crop&w=600&q=80",
    alt: "CCTV and security camera installation",
    width: 600,
    height: 600,
  },
  categoryEvent: {
    src: "https://images.unsplash.com/photo-1519237918043-1927db9530a6?auto=format&fit=crop&w=600&q=80",
    alt: "Event services and decoration setup",
    width: 600,
    height: 600,
  },
  categoryHandyman: {
    src: "https://images.unsplash.com/photo-1541863805531-6568912b5bf3?auto=format&fit=crop&w=600&q=80",
    alt: "General handyman with tools at work",
    width: 600,
    height: 600,
  },
  categoryApplianceRepair: {
    src: "https://images.unsplash.com/photo-1592918434891-248b1051e86f?auto=format&fit=crop&w=600&q=80",
    alt: "Technician repairing a home appliance",
    width: 600,
    height: 600,
  },
  categoryConstruction: {
    src: "https://images.unsplash.com/photo-1504148405327-db944473ca3d?auto=format&fit=crop&w=600&q=80",
    alt: "Construction and masonry work at a site",
    width: 600,
    height: 600,
  },
  categoryFurnitureAssembly: {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    alt: "Furniture assembly professional",
    width: 600,
    height: 600,
  },
  categoryITNetworking: {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    alt: "IT and networking technician",
    width: 600,
    height: 600,
  },
  categoryPhotography: {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b2440326?auto=format&fit=crop&w=600&q=80",
    alt: "Photographer at work with camera",
    width: 600,
    height: 600,
  },
  categoryCarWash: {
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80",
    alt: "Car washing and detailing professional",
    width: 600,
    height: 600,
  },
  customerRegistration: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    alt: "Person arranging a household service",
    width: 800,
    height: 600,
  },
  providerRegistration: {
    src: "https://images.unsplash.com/photo-1504674934030-7b9d6187d564?auto=format&fit=crop&w=800&q=80",
    alt: "Skilled professional working in a trade",
    width: 800,
    height: 600,
  },
  providerAhmedRaza: {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    alt: "Ahmed Raza - trusted mechanic",
    width: 400,
    height: 400,
  },
  providerSaraKhan: {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    alt: "Sara Khan - professional service provider",
    width: 400,
    height: 400,
  },
  providerUsmanAli: {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    alt: "Usman Ali - skilled technician",
    width: 400,
    height: 400,
  },
  providerHinaMalik: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    alt: "Hina Malik - verified professional",
    width: 400,
    height: 400,
  },
  providerBilalAhmed: {
    src: "https://images.unsplash.com/photo-1507003211169-0a1272a8e3dc?auto=format&fit=crop&w=400&q=80",
    alt: "Bilal Ahmed - expert service provider",
    width: 400,
    height: 400,
  },
  aboutProfessionals: {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    alt: "INVOLVE professionals serving the community",
    width: 800,
    height: 600,
  },
  contactSupport: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    alt: "Customer support team ready to help",
    width: 800,
    height: 600,
  },
  emptyBookings: {
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    alt: "No bookings found",
    width: 600,
    height: 400,
  },
  emptyMessages: {
    src: "https://images.unsplash.com/photo-1611162617207-a583e1e5824e?auto=format&fit=crop&w=600&q=80",
    alt: "No messages found",
    width: 600,
    height: 400,
  },
  authSignIn: {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    alt: "Pakistani service professional beside a white service van",
    width: 1200,
    height: 800,
  },
  authProvider: {
    src: "https://images.unsplash.com/photo-1504674934030-7b9d6187d564?auto=format&fit=crop&w=1200&q=80",
    alt: "Pakistani service professional with toolbox beside a white van",
    width: 1200,
    height: 800,
  },
  authCustomer: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    alt: "Pakistani woman with a smartphone outdoors in an urban setting",
    width: 1200,
    height: 800,
  },
  fallback: {
    src: "https://images.unsplash.com/photo-1460925895917-afaf655bd6c2?auto=format&fit=crop&w=600&q=80",
    alt: "INVOLVE placeholder image",
    width: 600,
    height: 400,
  },
};

export function getImage(key: string): ImageAsset {
  return images[key] ?? images.fallback;
}
