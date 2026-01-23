import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { banners } from '@/data/products';
import { cn } from '@/lib/utils';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section
      className="relative w-full overflow-hidden bg-card"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-[200px] sm:h-[280px] md:h-[350px] lg:h-[400px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-out",
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            )}
          >
            <div className={cn("absolute inset-0 bg-gradient-to-r", banner.bgColor)} />
            <img
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
              }}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 lg:px-24">
              <div className="max-w-lg text-primary-foreground animate-fade-in-up">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-sm sm:text-lg md:text-xl mb-4 md:mb-6 opacity-90">
                  {banner.subtitle}
                </p>
                <button className="px-6 py-2 md:px-8 md:py-3 bg-card text-foreground font-semibold rounded-sm hover:bg-secondary hover:text-secondary-foreground transition-colors shadow-lg">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-card/90 rounded-full shadow-lg hover:bg-card transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary transition-colors" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-card/90 rounded-full shadow-lg hover:bg-card transition-colors group"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-card w-6 md:w-8"
                : "bg-card/50 hover:bg-card/70"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
