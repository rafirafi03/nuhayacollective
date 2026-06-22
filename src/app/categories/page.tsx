import { Container } from "@/components/shared/container";
import { PageHeader } from "@/components/shared/page-header";
import { getCategories } from "@/services/content-service";
import Link from "next/link";
import { SafeImage } from "@/components/shared/safe-image";
import { categoryImage } from "@/lib/images";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="section-parchment min-h-[60vh]">
      <Container className="py-10 sm:py-14">
        <PageHeader
          label="Collections"
          title="Explore by Style"
          subtitle="Open, closed, kimono, embroidered, and evening abayas for every occasion."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, i) => (
            <Link key={cat._id} href={`/products?category=${cat.slug.current}`} className="group">
              <div className="luxury-card p-1.5 overflow-hidden transition-all duration-500 group-hover:border-brand-gold/40">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-brand-oud">
                  <SafeImage
                    src={cat.imageUrl || categoryImage(i)}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.88]"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                  <div className="absolute inset-0 scrim-bottom" />
                  <div className="overlay-content absolute inset-x-0 bottom-0 z-10 p-4">
                    <h3 className="font-heading text-base sm:text-lg font-medium">{cat.name}</h3>
                    {cat.productCount && (
                      <p className="text-[10px] uppercase tracking-[0.15em] text-brand-gold mt-1">
                        {cat.productCount} styles
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
