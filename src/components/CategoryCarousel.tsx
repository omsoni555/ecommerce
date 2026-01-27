import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/products';

const CategoryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-card py-4 md:py-6 shadow-card">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Scroll Buttons */}
              <button onClick={() => scroll('left')} className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-card shadow-md rounded-full hover:shadow-lg transition-shadow" > <ChevronLeft className="w-5 h-5 text-muted-foreground" /> </button>

          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-card shadow-md rounded-full hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Category Items */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide px-8 md:px-12 py-2"
          >
            {categories.map((category, index) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="flex flex-col items-center gap-2 min-w-[80px] md:min-w-[100px] group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-muted group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors whitespace-nowrap">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
