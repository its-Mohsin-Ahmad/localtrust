/**
 * INVOLVE service categories and Pakistan location hierarchy.
 *
 * Category list per spec §5 (Step 1 dropdown).
 * Location hierarchy: province/region → city → areas/localities.
 * Only real Pakistan administrative data — no fabricated live results.
 */

export interface ServiceCategory {
  key: string;
  label: string;
  imageKey?: string;
}

export interface Area {
  slug: string;
  name: string;
}

export interface City {
  slug: string;
  name: string;
  region: string;
  areas: Area[];
}

export interface Region {
  slug: string;
  name: string;
  cities: City[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { key: "plumbing", label: "Plumbing", imageKey: "categoryPlumbing" },
  { key: "electrical", label: "Electrical", imageKey: "categoryElectrical" },
  { key: "home_cleaning", label: "Home Cleaning", imageKey: "categoryCleaning" },
  { key: "mechanics", label: "Mechanics", imageKey: "categoryMechanic" },
  { key: "tutoring", label: "Tutoring", imageKey: "categoryTutoring" },
  { key: "carpentry", label: "Carpentry", imageKey: "categoryCarpentry" },
  { key: "painting", label: "Painting", imageKey: "categoryPainting" },
  { key: "ac_refrigeration", label: "AC & Refrigeration", imageKey: "categoryACRepair" },
  { key: "appliance_repair", label: "Appliance Repair", imageKey: "categoryApplianceRepair" },
  { key: "computer_it", label: "Computer & IT", imageKey: "categoryComputerRepair" },
  { key: "gardening", label: "Gardening", imageKey: "categoryGardening" },
  { key: "moving_services", label: "Moving Services" },
  { key: "solar_installation", label: "Solar Installation" },
  { key: "pest_control", label: "Pest Control" },
  { key: "construction", label: "Construction", imageKey: "categoryConstruction" },
  { key: "beauty_personal_care", label: "Beauty & Personal Care" },
  { key: "photography", label: "Photography", imageKey: "categoryPhotography" },
  { key: "laundry", label: "Laundry" },
  { key: "other_services", label: "Other Services" },
] as const;

export function categoryLabel(key: string): string {
  return SERVICE_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export const REGISTRATION_FEE_PAISA = 200_00;

export const PAKISTAN_COUNTRY_CODE = "+92";

export const PAKISTAN_REGIONS: Region[] = [
  {
    slug: "punjab",
    name: "Punjab",
    cities: [
      {
        slug: "lahore", name: "Lahore", region: "Punjab",
        areas: [
          { slug: "gulberg", name: "Gulberg" },
          { slug: "defence", name: "Defence (DHA)" },
          { slug: "model_town", name: "Model Town" },
          { slug: "johar_town", name: "Johar Town" },
          { slug: "wapda_town", name: "WAPDA Town" },
          { slug: "lahore_cantonment", name: "Lahore Cantonment" },
        ],
      },
      {
        slug: "rawalpindi", name: "Rawalpindi", region: "Punjab",
        areas: [
          { slug: "bahria_town", name: "Bahria Town" },
          { slug: "saddar", name: "Saddar" },
          { slug: "murree_road", name: "Murree Road" },
        ],
      },
      {
        slug: "faisalabad", name: "Faisalabad", region: "Punjab",
        areas: [{ slug: "gulberg", name: "Gulberg" }, { slug: "lyallpur", name: "Lyallpur" }],
      },
      {
        slug: "multan", name: "Multan", region: "Punjab",
        areas: [{ slug: "bosan_road", name: "Bosan Road" }, { slug: "multan_cantonment", name: "Multan Cantonment" }],
      },
      {
        slug: "gujranwala", name: "Gujranwala", region: "Punjab",
        areas: [{ slug: "satellite_town", name: "Satellite Town" }],
      },
      {
        slug: "sialkot", name: "Sialkot", region: "Punjab",
        areas: [{ slug: "sialkot_cantonment", name: "Sialkot Cantonment" }],
      },
    ],
  },
  {
    slug: "sindh",
    name: "Sindh",
    cities: [
      {
        slug: "karachi", name: "Karachi", region: "Sindh",
        areas: [
          { slug: "defence", name: "Defence (DHA)" },
          { slug: "clifton", name: "Clifton" },
          { slug: "gulshan_e_iqbal", name: "Gulshan-e-Iqbal" },
          { slug: "nazimabad", name: "Nazimabad" },
          { slug: "korangi", name: "Korangi" },
        ],
      },
      {
        slug: "hyderabad", name: "Hyderabad", region: "Sindh",
        areas: [{ slug: "saddar", name: "Saddar" }, { slug: "latifabad", name: "Latifabad" }],
      },
    ],
  },
  {
    slug: "ict",
    name: "Islamabad Capital Territory",
    cities: [
      {
        slug: "islamabad", name: "Islamabad", region: "ICT",
        areas: [
          { slug: "f_6", name: "F-6" },
          { slug: "f_7", name: "F-7" },
          { slug: "f_10", name: "F-10" },
          { slug: "g_6", name: "G-6" },
          { slug: "g_7", name: "G-7" },
          { slug: "bahria_town", name: "Bahria Town" },
        ],
      },
    ],
  },
  {
    slug: "kpk",
    name: "Khyber Pakhtunkhwa (KPK)",
    cities: [
      {
        slug: "peshawar", name: "Peshawar", region: "KPK",
        areas: [{ slug: "hayatabad", name: "Hayatabad" }, { slug: "saddar", name: "Saddar" }],
      },
    ],
  },
  {
    slug: "balochistan",
    name: "Balochistan",
    cities: [
      {
        slug: "quetta", name: "Quetta", region: "Balochistan",
        areas: [{ slug: "sariab", name: "Sariab" }, { slug: "quetta_cantonment", name: "Quetta Cantonment" }],
      },
    ],
  },
] as const;

export function getCityBySlug(slug: string): City | undefined {
  for (const region of PAKISTAN_REGIONS) {
    const city = region.cities.find((c) => c.slug === slug);
    if (city) return city;
  }
  return undefined;
}

export function getRegionBySlug(slug: string): Region | undefined {
  return PAKISTAN_REGIONS.find((r) => r.slug === slug);
}

export function allCities(): City[] {
  return PAKISTAN_REGIONS.flatMap((r) => r.cities);
}
