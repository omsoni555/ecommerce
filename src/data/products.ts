export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  freeDelivery: boolean;
  assured: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  bgColor: string;
}

export const categories: Category[] = [
  { id: "1", name: "Mobiles", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop", slug: "mobiles" },
  { id: "2", name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop", slug: "electronics" },
  { id: "3", name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop", slug: "fashion" },
  { id: "4", name: "Home & Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop", slug: "home" },
  { id: "5", name: "Appliances", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop", slug: "appliances" },
  { id: "6", name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop", slug: "beauty" },
  { id: "7", name: "Toys & Baby", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop", slug: "toys" },
  { id: "8", name: "Sports", image: "https://images.unsplash.com/photo-1461896836934- voices?w=200&h=200&fit=crop", slug: "sports" },
  { id: "9", name: "Grocery", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop", slug: "grocery" },
];

export const banners: Banner[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
    title: "Big Billion Days",
    subtitle: "Up to 80% OFF on Electronics",
    link: "/offers",
    bgColor: "from-primary to-primary/80",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=400&fit=crop",
    title: "Fashion Sale",
    subtitle: "Trending Styles at Best Prices",
    link: "/category/fashion",
    bgColor: "from-secondary to-secondary/80",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
    title: "Home Makeover",
    subtitle: "Appliances Starting ₹999",
    link: "/category/appliances",
    bgColor: "from-success to-success/80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB",
    description: "Apple iPhone with A17 Pro chip, 48MP camera system, titanium design",
    price: 159900,
    originalPrice: 179900,
    discount: 11,
    rating: 4.6,
    reviews: 12543,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    category: "mobiles",
    brand: "Apple",
    inStock: true,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra 5G",
    description: "200MP Camera, Snapdragon 8 Gen 3, S Pen included",
    price: 129999,
    originalPrice: 149999,
    discount: 13,
    rating: 4.5,
    reviews: 8934,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    category: "mobiles",
    brand: "Samsung",
    inStock: true,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation, 30hr battery",
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    rating: 4.7,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "Sony",
    inStock: true,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "4",
    name: "MacBook Air M3 13-inch",
    description: "Apple M3 chip, 8GB RAM, 256GB SSD, Liquid Retina display",
    price: 114990,
    originalPrice: 119900,
    discount: 4,
    rating: 4.8,
    reviews: 3245,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "Apple",
    inStock: true,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "5",
    name: "Nike Air Max 270",
    description: "Men's running shoes with Air Max unit heel",
    price: 12995,
    originalPrice: 15995,
    discount: 19,
    rating: 4.4,
    reviews: 7832,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "fashion",
    brand: "Nike",
    inStock: true,
    freeDelivery: false,
    assured: true,
  },
  {
    id: "6",
    name: "Levi's 511 Slim Fit Jeans",
    description: "Classic slim fit denim with stretch comfort",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 4.3,
    reviews: 12456,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "fashion",
    brand: "Levi's",
    inStock: true,
    freeDelivery: false,
    assured: false,
  },
  {
    id: "7",
    name: "LG 55-inch 4K OLED TV",
    description: "OLED evo, webOS, Dolby Vision & Atmos",
    price: 124990,
    originalPrice: 159990,
    discount: 22,
    rating: 4.6,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "LG",
    inStock: true,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "8",
    name: "Dyson V15 Detect Vacuum",
    description: "Laser detect technology, LCD screen, 60min runtime",
    price: 62900,
    originalPrice: 69900,
    discount: 10,
    rating: 4.5,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
    category: "appliances",
    brand: "Dyson",
    inStock: true,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "9",
    name: "Wooden Coffee Table",
    description: "Solid sheesham wood, contemporary design",
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.2,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop",
    category: "home",
    brand: "Urban Ladder",
    inStock: true,
    freeDelivery: true,
    assured: false,
  },
  {
    id: "10",
    name: "Maybelline Fit Me Foundation",
    description: "Matte + Poreless liquid foundation, SPF 22",
    price: 399,
    originalPrice: 550,
    discount: 27,
    rating: 4.1,
    reviews: 28764,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    category: "beauty",
    brand: "Maybelline",
    inStock: true,
    freeDelivery: false,
    assured: true,
  },
  {
    id: "11",
    name: "PlayStation 5 Console",
    description: "825GB SSD, 4K gaming, DualSense controller included",
    price: 49990,
    originalPrice: 54990,
    discount: 9,
    rating: 4.8,
    reviews: 6543,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "Sony",
    inStock: false,
    freeDelivery: true,
    assured: true,
  },
  {
    id: "12",
    name: "Boat Airdopes 441 Pro",
    description: "TWS earbuds, 150hr playback, ENx technology",
    price: 1999,
    originalPrice: 4490,
    discount: 55,
    rating: 4.0,
    reviews: 45621,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "electronics",
    brand: "boAt",
    inStock: true,
    freeDelivery: false,
    assured: true,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getTopDeals = (): Product[] => {
  return products.filter((p) => p.discount >= 20).slice(0, 8);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter((p) => p.rating >= 4.5).slice(0, 8);
};
