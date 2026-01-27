import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card group block bg-card rounded-sm overflow-hidden hover-lift animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
            }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-card shadow-md transition-all duration-200 hover:scale-110",
            inWishlist ? "text-offer" : "text-muted-foreground hover:text-offer"
          )}
        >c
          <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 badge-offer">
            {product.discount}% OFF
          </div>
        )}

        {/* Quick Add to Cart */}
        <div className="product-card-actions absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/80 to-transparent">
          <button
            onClick={handleAddToCart}
            className={cn(
              "w-full py-2 rounded-sm font-semibold text-sm flex items-center justify-center gap-2 transition-colors",
              inCart
                ? "bg-success text-success-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
            )}
          >
            {inCart ? (
              <>
                <Zap className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 space-y-2">
        {/* Brand & Assured Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{product.brand}</span>
          {product.assured && (
            <div className="flex items-center gap-0.5 text-primary text-[10px] font-bold">
              <span className="bg-primary text-primary-foreground px-1 rounded text-[8px]">F</span>
              Assured
            </div>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-success text-success-foreground text-xs font-semibold px-1.5 py-0.5 rounded">
            {product.rating}
            <Star className="w-3 h-3 fill-current" />
          </span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-semibold text-success">
                {product.discount}% off
              </span>
            </>
          )}
        </div>

        {/* Free Delivery */}
        {product.freeDelivery && (
          <p className="text-xs text-muted-foreground">Free Delivery</p>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <p className="text-xs text-destructive font-medium">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
