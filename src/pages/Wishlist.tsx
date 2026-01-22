import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleMoveToCart = (productId: string) => {
    const product = wishlist.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            My Wishlist {wishlist.length > 0 && `(${wishlist.length} items)`}
          </h1>

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-card rounded-sm">
              <Heart className="w-24 h-24 text-muted-foreground mb-6" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Save items you love by clicking the heart icon on any product.
                They'll appear here so you can easily find them later!
              </p>
              <Link
                to="/"
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {wishlist.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-card rounded-sm overflow-hidden hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-card shadow-md text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 badge-offer">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <Link to={`/product/${product.id}`}>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mt-1">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-1 mt-2">
                      <span className="inline-flex items-center gap-0.5 bg-success text-success-foreground text-xs font-semibold px-1 py-0.5 rounded">
                        {product.rating}
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-bold text-foreground">{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleMoveToCart(product.id)}
                      disabled={isInCart(product.id)}
                      className="w-full mt-3 py-2 text-sm font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
