import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSection from '@/components/ProductSection';
import { categories, getProductsByCategory, products } from '@/data/products';
import { Filter, ChevronDown, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = slug ? getProductsByCategory(slug) : [];
  
  // If no products found for category, show all products
  const displayProducts = categoryProducts.length > 0 ? categoryProducts : products;

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price - Low to High' },
    { value: 'price-high', label: 'Price - High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Customer Rating' },
  ];

  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-4">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4">
            <span className="hover:text-primary cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{category?.name || 'All Products'}</span>
          </nav>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-card rounded-sm p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-foreground">Filters</h2>
                  <button className="text-sm text-primary font-medium">Clear All</button>
                </div>

                {/* Categories Filter */}
                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground mb-3">CATEGORIES</h3>
                  <ul className="space-y-2">
                    {categories.slice(0, 6).map((cat) => (
                      <li key={cat.id}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <input type="checkbox" className="rounded border-border" />
                          {cat.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Filter */}
                <div className="border-t border-border pt-4 mt-4">
                  <h3 className="font-semibold text-foreground mb-3">PRICE</h3>
                  <ul className="space-y-2">
                    {['Under ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', 'Above ₹20,000'].map((range) => (
                      <li key={range}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <input type="checkbox" className="rounded border-border" />
                          {range}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brand Filter */}
                <div className="border-t border-border pt-4 mt-4">
                  <h3 className="font-semibold text-foreground mb-3">BRAND</h3>
                  <ul className="space-y-2">
                    {['Apple', 'Samsung', 'Sony', 'Nike', 'LG'].map((brand) => (
                      <li key={brand}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <input type="checkbox" className="rounded border-border" />
                          {brand}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating Filter */}
                <div className="border-t border-border pt-4 mt-4">
                  <h3 className="font-semibold text-foreground mb-3">CUSTOMER RATINGS</h3>
                  <ul className="space-y-2">
                    {['4★ & above', '3★ & above', '2★ & above'].map((rating) => (
                      <li key={rating}>
                        <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                          <input type="checkbox" className="rounded border-border" />
                          {rating}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Products Area */}
            <div className="flex-1">
              {/* Header */}
              <div className="bg-card rounded-sm p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-lg font-bold text-foreground">
                  {category?.name || 'All Products'}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    (Showing {sortedProducts.length} products)
                  </span>
                </h1>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border rounded-sm text-sm">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-card border border-border rounded-sm px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {sortedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-16 bg-card rounded-sm">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Category;
