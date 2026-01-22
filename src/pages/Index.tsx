import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import CategoryCarousel from '@/components/CategoryCarousel';
import ProductSection from '@/components/ProductSection';
import { getTopDeals, getTrendingProducts, products } from '@/data/products';
import { Zap, Truck, Shield, RotateCcw } from 'lucide-react';

const Index = () => {
  const topDeals = getTopDeals();
  const trendingProducts = getTrendingProducts();
  const allProducts = products;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Category Carousel */}
        <CategoryCarousel />

        {/* Features Banner */}
        <section className="bg-card border-y border-border py-4">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Zap, title: 'Flash Deals', desc: 'Updated every hour' },
                { icon: Truck, title: 'Free Delivery', desc: 'On orders over ₹499' },
                { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
                { icon: RotateCcw, title: 'Easy Returns', desc: '10-day returns' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-primary/10 rounded-full">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Deals - Carousel */}
        <div className="mt-3">
          <ProductSection
            title="⚡ Top Deals"
            products={topDeals}
            viewAllLink="/offers"
            isCarousel
          />
        </div>

        {/* Trending Now - Carousel */}
        <div className="mt-3">
          <ProductSection
            title="🔥 Trending Now"
            products={trendingProducts}
            viewAllLink="/trending"
            isCarousel
          />
        </div>

        {/* Deals of the Day Banner */}
        <section className="container mx-auto px-4 py-6">
          <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-offer to-offer/80 p-6 md:p-8">
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-offer-foreground mb-2">
                Deals of the Day
              </h2>
              <p className="text-offer-foreground/90 mb-4">
                Up to 80% off on electronics, fashion & more
              </p>
              <button className="px-6 py-2 bg-card text-foreground font-semibold rounded-sm hover:bg-secondary hover:text-secondary-foreground transition-colors">
                Shop Now
              </button>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_white_0%,_transparent_50%)]" />
            </div>
          </div>
        </section>

        {/* All Products Grid */}
        <ProductSection
          title="Explore Products"
          products={allProducts}
          viewAllLink="/products"
        />

        {/* Newsletter Section */}
        <section className="bg-primary py-10 md:py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Subscribe for Exclusive Offers
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
              Get the latest deals and discounts delivered straight to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 rounded-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button className="h-12 px-8 bg-secondary text-secondary-foreground font-semibold rounded-sm hover:bg-secondary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
