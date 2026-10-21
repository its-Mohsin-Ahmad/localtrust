/**
 * Cities covered by INVOLVE.
 *
 * Shared between the `/locations` index and the `/locations/[city]` detail
 * route so every linked city has a pre-rendered page in the static export.
 */

export interface CityLocation {
  /** URL segment used by `/locations/[city]`. */
  slug: string;
  name: string;
  region: string;
  count: string;
  href: string;
}

export const LOCATIONS: CityLocation[] = [
  { slug: "lahore", name: "Lahore", region: "Punjab", count: "1,200 providers", href: "/locations/lahore" },
  { slug: "karachi", name: "Karachi", region: "Sindh", count: "1,500 providers", href: "/locations/karachi" },
  { slug: "islamabad", name: "Islamabad", region: "ICT", count: "600 providers", href: "/locations/islamabad" },
  { slug: "rawalpindi", name: "Rawalpindi", region: "Punjab", count: "400 providers", href: "/locations/rawalpindi" },
  { slug: "faisalabad", name: "Faisalabad", region: "Punjab", count: "500 providers", href: "/locations/faisalabad" },
  { slug: "multan", name: "Multan", region: "Punjab", count: "350 providers", href: "/locations/multan" },
  { slug: "peshawar", name: "Peshawar", region: "KPK", count: "300 providers", href: "/locations/peshawar" },
  { slug: "quetta", name: "Quetta", region: "Balochistan", count: "150 providers", href: "/locations/quetta" },
];

export function getLocation(slug: string): CityLocation {
  return LOCATIONS.find((l) => l.slug === slug) ?? LOCATIONS[0];
}