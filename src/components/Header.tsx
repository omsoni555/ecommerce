import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

const Header = () => {
  const { cartCount, wishlistCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-secondary shadow-lg">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-secondary-foreground tracking-tight">NexCart</span>
              <span className="text-[10px] text-secondary-foreground/80 italic flex items-center gap-1">
                Explore <span className="text-secondary-foreground/70">Plus</span>
                <span className="text-primary">✦</span>
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-12 rounded-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
              />
              <button className="absolute right-0 top-0 h-10 w-12 flex items-center justify-center text-primary hover:text-primary/80 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div 
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="flex items-center gap-1 text-secondary-foreground hover:text-primary transition-colors font-medium">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card rounded-sm shadow-lg py-2 animate-fade-in">
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                    >
                       <img
                         src={cat.image}
                         alt={cat.name}
                         loading="lazy"
                         onError={(e) => {
                           const img = e.currentTarget;
                           if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
                         }}
                         className="w-8 h-8 rounded-full object-cover"
                       />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/wishlist" className="relative flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors font-medium">
              <Heart className="w-5 h-5" />
              <span className="hidden lg:inline">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 lg:-top-1 lg:right-12 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors font-medium">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 lg:-top-1 lg:right-6 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="flex items-center gap-2 text-secondary-foreground hover:text-primary transition-colors font-medium">
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">Login</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/cart" className="relative text-secondary-foreground">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-foreground"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-12 rounded-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
            />
            <button className="absolute right-0 top-0 h-10 w-12 flex items-center justify-center text-primary">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[120px] bg-card shadow-lg transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[calc(100vh-120px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 space-y-4">
          <Link
            to="/wishlist"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors"
          >
            <Heart className="w-5 h-5" />
            Wishlist
            {wishlistCount > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors w-full">
            <User className="w-5 h-5" />
            Login
          </button>
          <hr className="border-border" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</p>
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                 <img
                   src={cat.image}
                   alt={cat.name}
                   loading="lazy"
                   onError={(e) => {
                     const img = e.currentTarget;
                     if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
                   }}
                   className="w-6 h-6 rounded-full object-cover"
                 />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
