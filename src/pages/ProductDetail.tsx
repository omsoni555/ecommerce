import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSection from '@/components/ProductSection';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Zap, Minus, Plus, Share2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const inWishlist = product ? isInWishlist(product.id) : false;
  const inCart = product ? isInCart(product.id) : false;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Link to="/" className="text-primary hover:underline">Go back to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Related products
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="bg-card rounded-sm p-4 aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
                  }}
                  className="w-full h-full object-contain animate-fade-in"
                />
              </div>
              
              {/* Thumbnail Gallery (simulated) */}
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-16 h-16 border-2 rounded-sm overflow-hidden transition-colors",
                      selectedImage === i ? "border-primary" : "border-border"
                    )}
                  >
                    <img
                      src={product.image}
                      alt={`View ${i + 1}`}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (!img.src.endsWith('/placeholder.svg')) img.src = '/placeholder.svg';
                      }}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Share */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{product.brand}</span>
                  {product.assured && (
                    <div className="flex items-center gap-0.5 text-primary text-xs font-bold">
                      <span className="bg-primary text-primary-foreground px-1 rounded text-[10px]">F</span>
                      Assured
                    </div>
                  )}
                </div>
                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 bg-success text-success-foreground text-sm font-semibold px-2 py-1 rounded">
                  {product.rating}
                  <Star className="w-3.5 h-3.5 fill-current" />
                </span>
                <span className="text-muted-foreground">
                  {product.reviews.toLocaleString()} Ratings & Reviews
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-lg font-semibold text-success">
                        {product.discount}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">inclusive of all taxes</p>
              </div>

              {/* Offers */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Available Offers</h3>
                <ul className="space-y-1.5">
                  {[
                    'Bank Offer: 10% off on HDFC Credit Cards',
                    'Special Price: Get extra 5% off (price inclusive of discount)',
                    'Partner Offer: Sign-up for Flipkart Pay Later & get free Times Prime',
                  ].map((offer, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Zap className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-sm">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {product.freeDelivery ? 'Free Delivery' : 'Delivery: ₹40'}
                  </p>
                  <p className="text-xs text-muted-foreground">Delivery by Tomorrow</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium border-x border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={cn(
                    "flex-1 py-4 font-bold rounded-sm flex items-center justify-center gap-2 transition-colors",
                    product.inStock
                      ? inCart
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {inCart ? 'ADDED TO CART' : 'ADD TO CART'}
                </button>
                <button
                  onClick={handleWishlist}
                  className={cn(
                    "px-6 py-4 font-bold rounded-sm border-2 flex items-center justify-center gap-2 transition-colors",
                    inWishlist
                      ? "border-offer text-offer"
                      : "border-border text-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                  WISHLIST
                </button>
              </div>

              {/* Stock Status */}
              {!product.inStock && (
                <p className="text-destructive font-medium">Currently out of stock</p>
              )}

              {/* Highlights */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground">Highlights</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    1 Year Warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-primary" />
                    10 Days Return
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" />
                    Fast Delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    COD Available
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <ProductSection
                title="Similar Products"
                products={relatedProducts}
                isCarousel
              />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
