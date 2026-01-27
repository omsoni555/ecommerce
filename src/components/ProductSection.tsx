import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  isCarousel?: boolean;
}

const ProductSection = ({ title, products, viewAllLink, isCarousel = false }: ProductSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (isCarousel) {
    return (
      <section className="bg-card py-4 shadow-card">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-foreground">{title}</h2>
            {viewAllLink && (
              <a
                href={viewAllLink}
                className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-sm hover:bg-primary/90 transition-colors"
              >
                View All
              </a>
            )}
          </div>

          {/* Carousel */}
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-20 flex items-center justify-center bg-card shadow-lg rounded-r-sm hover:shadow-xl transition-shadow"
            >a
              <ChevronLeft className="w-6 h-6 text-muted-foreground" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-20 flex items-center justify-center bg-card shadow-lg rounded-l-sm hover:shadow-xl transition-shadow"
            >b
              <ChevronRight className="w-6 h-6 text-muted-foreground" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-2 py-2"
            >
              {products.map((product, index) => (
                <div key={product.id} className="min-w-[180px] md:min-w-[220px]">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
            >
              View All →
            </a>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
