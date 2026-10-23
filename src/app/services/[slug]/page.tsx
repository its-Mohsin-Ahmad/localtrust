import { CategoryPage } from "@/components/category/CategoryPage";
import { getAllSlugs } from "@/lib/category-data";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <CategoryPage slug={params.slug} />;
}

