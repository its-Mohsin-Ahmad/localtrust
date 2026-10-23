import { getImage } from "@/lib/images";

export interface CategoryService { name: string; price: string; }
export interface CategoryFaq { q: string; a: string; }
export interface CarouselItem { title: string; desc: string; imageKey: string; }
export interface CategoryConfig {
  slug: string; name: string; label: string; heroTitle: string; heroHighlight: string;
  heroSubtitle: string; heroImageKey: string; searchPlaceholder: string;
  popularSearches: string[]; carousel: CarouselItem[]; services: CategoryService[];
  filters: string[]; related: string[]; faqs: CategoryFaq[]; startingPrice: string;
}

const baseServices = (items: string[], price: string): CategoryService[] =>
  items.map((name) => ({ name, price }));

const mk = (slug: string, name: string, label: string, title: string, highlight: string, sub: string, img: string, searches: string[], services: string[], price: string, related: string[], faqs: CategoryFaq[]): CategoryConfig => ({
  slug, name, label, heroTitle: title, heroHighlight: highlight, heroSubtitle: sub,
  heroImageKey: img, searchPlaceholder: "What " + name.toLowerCase() + " service do you need?",
  popularSearches: searches,
  carousel: searches.slice(0,4).map((s) => ({ title: s, desc: "Professional " + s.toLowerCase() + ".", imageKey: img })),
  services: baseServices(services, price), filters: ["Top Rated","Verified","Available Soon","Price Range"],
  related, faqs, startingPrice: price,
});

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "mechanics", name: "Mechanics", label: "AUTOMOTIVE SERVICES",
    heroTitle: "KEEP YOUR CAR READY FOR THE ROAD.", heroHighlight: "READY FOR THE ROAD.",
    heroSubtitle: "Find trusted mechanics for vehicle servicing, diagnostics, brake repair, oil changes and roadside assistance.",
    heroImageKey: "categoryMechanic", searchPlaceholder: "What mechanics service do you need?",
    popularSearches: ["Brake Repair","Oil Change","Tire Services","Engine Diagnostics"],
    carousel: [
      { title: "Expert Vehicle Servicing", desc: "Complete check-ups and maintenance.", imageKey: "categoryMechanic" },
      { title: "Advanced Diagnostics", desc: "Computerized fault detection.", imageKey: "categoryMechanic" },
      { title: "Brake Inspection & Repair", desc: "Safe, reliable brake service.", imageKey: "categoryMechanic" },
      { title: "Tire Services", desc: "Rotation, balancing and replacement.", imageKey: "categoryMechanic" },
    ],
    services: [{name:"General Servicing",price:"From PKR 1,500"},{name:"Engine Diagnostics",price:"From PKR 1,500"},{name:"Brake Repair",price:"From PKR 1,500"},{name:"Oil & Filter Change",price:"From PKR 1,500"},{name:"Battery Replacement",price:"From PKR 1,500"},{name:"Tire Services",price:"From PKR 1,500"}],
    filters: ["Top Rated","Verified","Available Soon","Price Range"], related: ["ac-repair","car-wash","electrical"],
    faqs: [{q:"How do I book a mechanic?",a:"Search, compare profiles and request a booking."},{q:"Do mechanics offer emergency repair?",a:"Many offer roadside assistance; check profile."},{q:"How much does a car service cost?",a:"Costs vary by vehicle and service."},{q:"Are the mechanics verified?",a:"Verified providers show a badge."}],
    startingPrice: "From PKR 1,500",
  },
  {
    slug: "painting", name: "Painting", label: "PAINTING SERVICES",
    heroTitle: "GIVE YOUR SPACE A FRESH NEW LOOK.", heroHighlight: "FRESH NEW LOOK.",
    heroSubtitle: "Find professional painters for interior and exterior painting, wall preparation and decorative finishes.",
    heroImageKey: "categoryPainting", searchPlaceholder: "What painting service do you need?",
    popularSearches: ["Interior Painting","Exterior Painting","Wall Preparation","House Painting"],
    carousel: [
      { title: "Interior Painting", desc: "Smooth, even finishes.", imageKey: "categoryPainting" },
      { title: "Exterior Painting", desc: "Weather-resistant coatings.", imageKey: "categoryPainting" },
      { title: "Wall Preparation", desc: "Crack filling, sanding, priming.", imageKey: "categoryPainting" },
      { title: "Commercial Painting", desc: "Large-scale projects.", imageKey: "categoryPainting" },
    ],
    services: [{name:"Interior Painting",price:"From PKR 2,000"},{name:"Exterior Painting",price:"From PKR 2,000"},{name:"Wall Preparation",price:"From PKR 2,000"},{name:"Ceiling Painting",price:"From PKR 2,000"},{name:"Door & Window Painting",price:"From PKR 2,000"}],
    filters: ["Top Rated","Verified","Price Range","Experience"], related: ["carpentry","cleaning","interior-design"],
    faqs: [{q:"How do I estimate painting costs?",a:"Costs depend on area and materials."},{q:"Do painters provide materials?",a:"Many do; confirm before booking."},{q:"Can I book interior and exterior?",a:"Yes, select the service when booking."}],
    startingPrice: "From PKR 2,000",
  },
  {
    slug: "cleaning", name: "Home Cleaning", label: "HOME CLEANING SERVICES",
    heroTitle: "A CLEANER HOME STARTS HERE.", heroHighlight: "STARTS HERE.",
    heroSubtitle: "Book professional cleaners for regular, deep, move-in/move-out and office cleaning.",
    heroImageKey: "categoryCleaning", searchPlaceholder: "What cleaning service do you need?",
    popularSearches: ["Deep Cleaning","Kitchen Cleaning","Bathroom Cleaning","Office Cleaning"],
    carousel: [
      { title: "Regular Home Cleaning", desc: "Routine upkeep.", imageKey: "categoryCleaning" },
      { title: "Deep Cleaning", desc: "Thorough cleaning.", imageKey: "categoryCleaning" },
      { title: "Move-In/Move-Out", desc: "Guest-ready property.", imageKey: "categoryCleaning" },
      { title: "Bathroom Cleaning", desc: "Sanitized bathrooms.", imageKey: "categoryCleaning" },
    ],
    services: [{name:"Regular Cleaning",price:"From PKR 1,200"},{name:"Deep Cleaning",price:"From PKR 1,200"},{name:"Kitchen Cleaning",price:"From PKR 1,200"},{name:"Bathroom Cleaning",price:"From PKR 1,200"},{name:"Office Cleaning",price:"From PKR 1,200"},{name:"Window Cleaning",price:"From PKR 1,200"}],
    filters: ["Top Rated","Verified","Available Soon","Price Range"], related: ["pest-control","gardening","plumbing"],
    faqs: [{q:"Can I book a one-time deep cleaning?",a:"Yes, choose one-time or recurring."},{q:"Do cleaners bring supplies?",a:"Many bring supplies; confirm."},{q:"Can I schedule recurring cleaning?",a:"Yes, set a recurring schedule."}],
    startingPrice: "From PKR 1,200",
  },
  {
    slug: "plumbing", name: "Plumbing", label: "PLUMBING SERVICES",
    heroTitle: "FIX LEAKS FAST. KEEP WATER FLOWING.", heroHighlight: "KEEP WATER FLOWING.",
    heroSubtitle: "Find plumbers for pipe repairs, drain cleaning, tap repair and water heater service.",
    heroImageKey: "categoryPlumbing", searchPlaceholder: "What plumbing service do you need?",
    popularSearches: ["Pipe Leakage","Drain Cleaning","Tap Repair","Water Heater Repair"],
    carousel: [{title:"Pipe Repair",desc:"Leak detection and replacement.",imageKey:"categoryPlumbing"},{title:"Drain Cleaning",desc:"Unclog sinks and drains.",imageKey:"categoryPlumbing"},{title:"Tap Repair",desc:"Fix dripping taps.",imageKey:"categoryPlumbing"},{title:"Water Heater Service",desc:"Installation and maintenance.",imageKey:"categoryPlumbing"}],
    services: [{name:"Pipe Repair",price:"From PKR 1,000"},{name:"Drain Cleaning",price:"From PKR 1,000"},{name:"Tap Repair",price:"From PKR 1,000"},{name:"Water Heater Repair",price:"From PKR 1,000"},{name:"Bathroom Fitting",price:"From PKR 1,000"}],
    filters: ["Top Rated","Verified","Available Soon"], related: ["electrical","cleaning","carpentry"],
    faqs: [{q:"How fast can a plumber arrive?",a:"Availability varies; check profiles."}],
    startingPrice: "From PKR 1,000",
  },
  {
    slug: "electrical", name: "Electrical", label: "ELECTRICAL SERVICES",
    heroTitle: "POWER YOUR HOME SAFELY.", heroHighlight: "SAFELY.",
    heroSubtitle: "Find licensed electricians for wiring, lighting and electrical repairs.",
    heroImageKey: "categoryElectrical", searchPlaceholder: "What electrical service do you need?",
    popularSearches: ["Wiring","Light Installation","Switchboard Repair","Fan Repair"],
    carousel: [{title:"Wiring",desc:"Safe new wiring.",imageKey:"categoryElectrical"},{title:"Light Installation",desc:"Fixtures and upgrades.",imageKey:"categoryElectrical"},{title:"Switchboard Repair",desc:"Panel and breaker work.",imageKey:"categoryElectrical"},{title:"Fan & Appliance Wiring",desc:"Installations and repairs.",imageKey:"categoryElectrical"}],
    services: [{name:"Wiring",price:"From PKR 1,200"},{name:"Light Installation",price:"From PKR 1,200"},{name:"Switchboard Repair",price:"From PKR 1,200"},{name:"Fan Repair",price:"From PKR 1,200"},{name:"Short Circuit Fix",price:"From PKR 1,200"}],
    filters: ["Top Rated","Verified","Available Soon"], related: ["plumbing","ac-repair","solar"],
    faqs: [{q:"Are electricians licensed?",a:"Verified providers have document checks."}],
    startingPrice: "From PKR 1,200",
  },
  {
    slug: "carpentry", name: "Carpentry", label: "CARPENTRY SERVICES",
    heroTitle: "CRAFTED WOODWORK FOR YOUR HOME.", heroHighlight: "FOR YOUR HOME.",
    heroSubtitle: "Find carpenters for furniture, doors, cabinets and woodwork.",
    heroImageKey: "categoryCarpentry", searchPlaceholder: "What carpentry service do you need?",
    popularSearches: ["Furniture Repair","Door Installation","Cabinet Making","Wood Polishing"],
    carousel: [{title:"Furniture Repair",desc:"Fix and restore furniture.",imageKey:"categoryCarpentry"},{title:"Door Installation",desc:"New doors and frames.",imageKey:"categoryCarpentry"},{title:"Cabinet Making",desc:"Custom cabinets.",imageKey:"categoryCarpentry"},{title:"Wood Polishing",desc:"Refinish surfaces.",imageKey:"categoryCarpentry"}],
    services: [{name:"Furniture Repair",price:"From PKR 1,500"},{name:"Door Installation",price:"From PKR 1,500"},{name:"Cabinet Making",price:"From PKR 1,500"},{name:"Wood Polishing",price:"From PKR 1,500"},{name:"Shelf Installation",price:"From PKR 1,500"}],
    filters: ["Top Rated","Verified"], related: ["painting","cleaning","plumbing"],
    faqs: [{q:"Do carpenters bring tools?",a:"Most bring tools; confirm materials."}],
    startingPrice: "From PKR 1,500",
  },
  {
    slug: "ac-repair", name: "AC Repair", label: "AC & HVAC SERVICES",
    heroTitle: "STAY COOL ALL SUMMER.", heroHighlight: "ALL SUMMER.",
    heroSubtitle: "Find AC technicians for installation, service and repair.",
    heroImageKey: "categoryACRepair", searchPlaceholder: "What AC service do you need?",
    popularSearches: ["AC Installation","AC Servicing","AC Gas Refill","AC Repair"],
    carousel: [{title:"AC Installation",desc:"New unit installation.",imageKey:"categoryACRepair"},{title:"AC Servicing",desc:"Cleaning and maintenance.",imageKey:"categoryACRepair"},{title:"Gas Refill",desc:"Refrigerant top-up.",imageKey:"categoryACRepair"},{title:"AC Repair",desc:"Fix cooling issues.",imageKey:"categoryACRepair"}],
    services: [{name:"AC Installation",price:"From PKR 2,000"},{name:"AC Servicing",price:"From PKR 2,000"},{name:"Gas Refill",price:"From PKR 2,000"},{name:"AC Repair",price:"From PKR 2,000"},{name:"Duct Cleaning",price:"From PKR 2,000"}],
    filters: ["Top Rated","Verified","Available Soon"], related: ["electrical","mechanics","solar"],
    faqs: [{q:"How often should AC be serviced?",a:"At least once a year."}],
    startingPrice: "From PKR 2,000",
  },
];
const extraSlugs = ["computer-repair","moving","gardening","tutoring","solar","pest-control","appliance-repair","beauty","car-wash","battery-replacement","interior-design","flooring","mobile-repair","photography","event-planning","catering","tailoring","laundry","fitness","delivery","security","translation","accounting","tutors","web-development"];
const nameFromSlug = (s: string) => s.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
for (const slug of extraSlugs) {
  if (!CATEGORIES.find((c) => c.slug === slug)) {
    const n = nameFromSlug(slug);
    CATEGORIES.push({
      slug, name: n, label: n.toUpperCase() + " SERVICES",
      heroTitle: "FIND TRUSTED " + n.toUpperCase() + " PROFESSIONALS.", heroHighlight: "PROFESSIONALS.",
      heroSubtitle: "Find verified " + n.toLowerCase() + " providers near you.",
      heroImageKey: "categoryCleaning", searchPlaceholder: "What " + n.toLowerCase() + " service do you need?",
      popularSearches: [n], carousel: [{ title: n, desc: "Professional service.", imageKey: "categoryCleaning" }],
      services: [{ name: n, price: "Price varies" }], filters: ["Top Rated","Verified"],
      related: ["cleaning","plumbing","electrical"], faqs: [{ q: "How do I book " + n.toLowerCase() + "?", a: "Search, compare and request a booking." }],
      startingPrice: "Price varies",
    });
  }
}

export function getCategory(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
export function getAllSlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}
export { getImage } from "@/lib/images";