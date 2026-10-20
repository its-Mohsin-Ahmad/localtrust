import { Hero } from "@/components/homepage/hero";
import { Categories } from "@/components/homepage/categories";
import { Professionals } from "@/components/homepage/professionals";
import { Benefits } from "@/components/homepage/benefits";
import { Testimonials } from "@/components/homepage/testimonials";
import { ProviderBanner } from "@/components/homepage/provider-banner";
import { Nearby } from "@/components/homepage/nearby";

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <Categories />
      <Professionals />
      <Benefits />
      <Testimonials />
      <ProviderBanner />
      <Nearby />
    </div>
  );
}
