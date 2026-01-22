import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, cartCount, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const originalTotal = items.reduce((total, item) => total + item.originalPrice * item.quantity, 0);
  const savings = originalTotal - cartTotal;
  const deliveryCharge = cartTotal > 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryCharge;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Shopping Cart {cartCount > 0 && `(${cartCount} items)`}
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-card rounded-sm">
              <ShoppingBag className="w-24 h-24 text-muted-foreground mb-6" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Looks like you haven't added anything to your cart yet.
                Start shopping to fill it up!
              </p>
              <Link
                to="/"
                className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-sm hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Delivery Info */}
                <div className="bg-card rounded-sm p-4 flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">
                    {cartTotal > 499 
                      ? 'Yay! You qualify for FREE delivery' 
                      : `Add ${formatPrice(499 - cartTotal)} more for FREE delivery`}
                  </span>
                </div>

                {/* Items List */}
                <div className="bg-card rounded-sm divide-y divide-border">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 flex gap-4 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-sm"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="text-sm md:text-base font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{item.brand}</p>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-lg font-bold text-foreground">{formatPrice(item.price)}</span>
                          {item.originalPrice > item.price && (
                            <>
                              <span className="text-sm text-muted-foreground line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                              <span className="text-xs font-semibold text-success">
                                {item.discount}% off
                              </span>
                            </>
                          )}
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-border rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart */}
                <div className="flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-sm p-4 sticky top-24">
                  <h2 className="text-lg font-bold text-foreground border-b border-border pb-3 mb-4">
                    PRICE DETAILS
                  </h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price ({cartCount} items)</span>
                      <span className="text-foreground">{formatPrice(originalTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-success">- {formatPrice(savings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Charges</span>
                      <span className={deliveryCharge === 0 ? "text-success" : "text-foreground"}>
                        {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                      </span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total Amount</span>
                      <span className="text-foreground">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {savings > 0 && (
                    <div className="mt-4 p-3 bg-success/10 rounded-sm flex items-center gap-2">
                      <Tag className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-medium">
                        You will save {formatPrice(savings)} on this order
                      </span>
                    </div>
                  )}

                  <button className="w-full mt-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-sm hover:bg-secondary/90 transition-colors">
                    PLACE ORDER
                  </button>

                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <img 
                      src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/shield_b33c0c.svg" 
                      alt="Safe & Secure" 
                      className="w-5 h-5"
                    />
                    Safe and Secure Payments. Easy returns.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
