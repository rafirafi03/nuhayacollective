import type {
  Product,
  Category,
  Brand,
  Banner,
  FAQ,
  Testimonial,
  StoreSettings,
  Review,
  OrderRequest,
  User,
  Coupon,
  ProductColor,
  InstagramReel,
} from "@/types";
import { JEWELRY_RING_SIZES } from "@/lib/fragrance-variants";
import {
  productImage,
  categoryImage,
  heroImage,
  avatarImage,
  promoImage,
} from "@/lib/images";

const slug = (s: string) => ({ _type: "slug" as const, current: s });

function buildVariantStock(sizes: string[], metals: ProductColor[], baseStock = 4) {
  return sizes.flatMap((size) =>
    metals.map((metal, i) => ({
      size,
      color: metal.name,
      stock: baseStock - (sizes.indexOf(size) % 2) - (i % 2),
    }))
  );
}

const metals = {
  gold: { name: "18K Yellow Gold", hex: "#C9A227" },
  rose: { name: "Rose Gold", hex: "#B76E79" },
  white: { name: "White Gold", hex: "#E8E8E8" },
  silver: { name: "Sterling Silver", hex: "#C0C0C0" },
} as const;

const ringSizes = ["6", "7", "8", "9", "10"];
const chainLengths = ['16"', '18"', '20"'];

export const mockSettings: StoreSettings = {
  _id: "settings-1",
  storeName: "Saanz by Sana",
  storeDescription:
    "Handcrafted fine jewellery by Sana — rings, necklaces, earrings, and bridal pieces designed with devotion and timeless elegance.",
  whatsappNumber: "919746807689",
  email: "hello@saanzbysana.com",
  phone: "+919746807689",
  address: "Kerala, India",
  socialLinks: {
    instagram: "https://www.instagram.com/saanzbysana/",
    facebook: "https://facebook.com/saanzbysana",
  },
  seoTitle: "Saanz by Sana — Fine Rings, Necklaces & Bridal",
  seoDescription:
    "Discover handcrafted fine jewellery at saanzbysana. Premium rings, necklaces, earrings, and bridal collections with WhatsApp ordering.",
  currency: "INR",
  currencySymbol: "₹",
};

export const mockCategories: Category[] = [
  { _id: "cat-1", name: "Rings", slug: slug("rings"), description: "Statement and everyday rings", featured: true, order: 1, productCount: 12, imageUrl: categoryImage(0) },
  { _id: "cat-2", name: "Necklaces", slug: slug("necklaces"), description: "Pendants, chains, and layered sets", featured: true, order: 2, productCount: 10, imageUrl: categoryImage(1) },
  { _id: "cat-3", name: "Earrings", slug: slug("earrings"), description: "Studs, drops, and chandelier styles", featured: true, order: 3, productCount: 8, imageUrl: categoryImage(2) },
  { _id: "cat-4", name: "Bracelets", slug: slug("bracelets"), description: "Bangles, cuffs, and tennis bracelets", featured: true, order: 4, productCount: 6, imageUrl: categoryImage(3) },
  { _id: "cat-5", name: "Bridal Collection", slug: slug("bridal-collection"), description: "Wedding and occasion jewellery", featured: true, order: 5, productCount: 5, imageUrl: categoryImage(4) },
  { _id: "cat-6", name: "Anklets", slug: slug("anklets"), description: "Delicate ankle chains", featured: false, order: 6, productCount: 4, imageUrl: categoryImage(5) },
];

export const mockBrands: Brand[] = [
  { _id: "brand-1", name: "Saanz Signature", slug: slug("saanz-signature"), description: "House fine jewellery collection" },
  { _id: "brand-2", name: "Royale Gems", slug: slug("royale-gems"), description: "Precious stone settings" },
  { _id: "brand-3", name: "Heritage Gold", slug: slug("heritage-gold"), description: "Traditional gold craftsmanship" },
];

export const mockInstagramReels: InstagramReel[] = [
  {
    _id: "reel-1",
    title: "Celestial Ring Styling",
    caption: "How we style our signature solitaire ✨",
    reelUrl: "https://www.instagram.com/reel/DZ4o9gCv3X5/",
    thumbnailUrl: productImage(0),
    productId: "prod-1",
    productName: "Celestial Diamond Ring",
    featured: true,
    order: 1,
  },
  {
    _id: "reel-2",
    title: "Rose Gold Pendant",
    caption: "Layering necklaces for evening wear",
    reelUrl: "https://www.instagram.com/reel/DZ2V6eRvzLT/",
    thumbnailUrl: productImage(2),
    productId: "prod-2",
    productName: "Rose Gold Pendant Necklace",
    featured: true,
    order: 2,
  },
  {
    _id: "reel-3",
    title: "Pearl Drop Earrings",
    caption: "Bridal earring pairing ideas",
    reelUrl: "https://www.instagram.com/reel/DZziqNQPNAL/",
    thumbnailUrl: productImage(3),
    productId: "prod-3",
    productName: "Pearl Drop Earrings",
    featured: true,
    order: 3,
  },
  {
    _id: "reel-4",
    title: "Heritage Bangle",
    caption: "Handcrafted gold bangle process",
    reelUrl: "https://www.instagram.com/reel/DZws1JfvJ0Y/",
    thumbnailUrl: productImage(4),
    productId: "prod-4",
    productName: "Heritage Gold Bangle",
    featured: true,
    order: 4,
  },
  {
    _id: "reel-5",
    title: "Bridal Set Reveal",
    caption: "Complete bridal necklace & earring set",
    reelUrl: "https://www.instagram.com/reel/DZuRsRevuQJ/",
    thumbnailUrl: productImage(6),
    productId: "prod-7",
    productName: "Bridal Necklace Set",
    featured: true,
    order: 5,
  },
];

export const mockAboutStoryReel: InstagramReel = {
  _id: "about-reel-1",
  title: "Our Craft",
  caption: "The artistry behind every piece",
  reelUrl: "https://www.instagram.com/reel/DZuRsRevuQJ/",
  thumbnailUrl: heroImage(0),
  featured: true,
  order: 1,
};

export const mockProducts: Product[] = [
  {
    _id: "prod-1",
    name: "Celestial Diamond Ring",
    slug: slug("celestial-diamond-ring"),
    shortDescription: "Solitaire diamond in a refined cathedral setting",
    description:
      "A timeless solitaire crafted in 18K gold with a brilliant-cut centre stone. The cathedral setting elevates the diamond for maximum light return — an heirloom piece for life's most meaningful moments.",
    price: 89999,
    compareAtPrice: 109999,
    stock: 8,
    status: "active",
    featured: true,
    isNewArrival: true,
    isBestSeller: true,
    imageUrl: productImage(0),
    category: mockCategories[0],
    brand: mockBrands[1],
    sizes: ringSizes,
    colors: [metals.gold, metals.white, metals.rose],
    variantStock: buildVariantStock(ringSizes, [metals.gold, metals.white, metals.rose], 3),
    specifications: [
      { key: "Metal", value: "18K Gold" },
      { key: "Stone", value: "Brilliant-cut diamond" },
      { key: "Setting", value: "Cathedral solitaire" },
      { key: "Certification", value: "IGI certified" },
    ],
    features: ["Hallmarked gold", "Lifetime polishing", "Luxury gift box"],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-1"),
    averageRating: 4.9,
    reviewCount: 86,
  },
  {
    _id: "prod-2",
    name: "Rose Gold Pendant Necklace",
    slug: slug("rose-gold-pendant-necklace"),
    shortDescription: "Delicate rose gold chain with teardrop pendant",
    description:
      "An effortlessly elegant pendant necklace in warm rose gold. The teardrop motif catches light beautifully — perfect alone or layered with shorter chains for a contemporary look.",
    price: 24999,
    compareAtPrice: 29999,
    stock: 15,
    status: "active",
    featured: true,
    isBestSeller: true,
    imageUrl: productImage(2),
    category: mockCategories[1],
    brand: mockBrands[0],
    sizes: chainLengths,
    colors: [metals.rose, metals.gold],
    variantStock: buildVariantStock(chainLengths, [metals.rose, metals.gold]),
    specifications: [
      { key: "Metal", value: "18K Rose Gold" },
      { key: "Chain", value: "Cable link" },
      { key: "Clasp", value: "Lobster clasp" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-2"),
    averageRating: 4.8,
    reviewCount: 64,
  },
  {
    _id: "prod-3",
    name: "Pearl Drop Earrings",
    slug: slug("pearl-drop-earrings"),
    shortDescription: "South Sea pearls on gold lever-back hooks",
    description:
      "Lustrous South Sea pearls suspended from hand-finished gold hooks. A bridal favourite and an elegant choice for evening occasions.",
    price: 18999,
    stock: 20,
    status: "active",
    featured: true,
    isNewArrival: true,
    imageUrl: productImage(3),
    category: mockCategories[2],
    brand: mockBrands[0],
    sizes: ["One Size"],
    colors: [metals.gold, metals.white],
    variantStock: buildVariantStock(["One Size"], [metals.gold, metals.white]),
    specifications: [
      { key: "Pearl", value: "South Sea, 10mm" },
      { key: "Metal", value: "18K Gold hooks" },
      { key: "Closure", value: "Lever-back" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-3"),
    averageRating: 4.9,
    reviewCount: 52,
  },
  {
    _id: "prod-4",
    name: "Heritage Gold Bangle",
    slug: slug("heritage-gold-bangle"),
    shortDescription: "Hand-engraved traditional gold bangle",
    description:
      "Inspired by Kerala temple jewellery, this heritage bangle features intricate hand engraving on solid 22K gold. A statement piece that honours craft traditions.",
    price: 124999,
    compareAtPrice: 139999,
    stock: 5,
    status: "active",
    isBestSeller: true,
    imageUrl: productImage(4),
    category: mockCategories[3],
    brand: mockBrands[2],
    sizes: ['2.4"', '2.6"', '2.8"'],
    colors: [metals.gold],
    variantStock: buildVariantStock(['2.4"', '2.6"', '2.8"'], [metals.gold], 2),
    specifications: [
      { key: "Metal", value: "22K Yellow Gold" },
      { key: "Weight", value: "Approx. 28g" },
      { key: "Finish", value: "Hand-engraved" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-4"),
    averageRating: 5,
    reviewCount: 31,
  },
  {
    _id: "prod-5",
    name: "Emerald Solitaire Ring",
    slug: slug("emerald-solitaire-ring"),
    shortDescription: "Colombian emerald in a vintage-inspired bezel",
    description:
      "A vivid Colombian emerald set in a vintage-inspired bezel with diamond accents on the band. For those who seek colour with unmistakable presence.",
    price: 149999,
    stock: 4,
    status: "active",
    featured: true,
    imageUrl: productImage(1),
    category: mockCategories[0],
    brand: mockBrands[1],
    sizes: ringSizes,
    colors: [metals.gold, metals.white],
    variantStock: buildVariantStock(ringSizes, [metals.gold, metals.white], 2),
    averageRating: 4.9,
    reviewCount: 28,
  },
  {
    _id: "prod-6",
    name: "Layered Chain Set",
    slug: slug("layered-chain-set"),
    shortDescription: "Three delicate chains in mixed metals",
    description:
      "A curated set of three chains in yellow gold, rose gold, and white gold finishes. Designed to be worn together or separately for versatile everyday luxury.",
    price: 34999,
    compareAtPrice: 41999,
    stock: 18,
    status: "active",
    isNewArrival: true,
    imageUrl: productImage(5),
    category: mockCategories[1],
    brand: mockBrands[0],
    sizes: ['16"', '18"'],
    colors: [{ name: "Mixed Metals", hex: "#C9A227" }],
    variantStock: buildVariantStock(['16"', '18"'], [{ name: "Mixed Metals", hex: "#C9A227" }]),
    averageRating: 4.7,
    reviewCount: 41,
  },
  {
    _id: "prod-7",
    name: "Bridal Necklace Set",
    slug: slug("bridal-necklace-set"),
    shortDescription: "Necklace, earrings, and maang tikka set",
    description:
      "A complete bridal set featuring a statement necklace, matching drop earrings, and maang tikka. Crafted in gold with uncut polki and pearl accents for traditional weddings.",
    price: 289999,
    compareAtPrice: 329999,
    stock: 3,
    status: "active",
    featured: true,
    isBestSeller: true,
    imageUrl: productImage(6),
    category: mockCategories[4],
    brand: mockBrands[2],
    sizes: ["Set"],
    colors: [metals.gold],
    variantStock: [{ size: "Set", color: "18K Yellow Gold", stock: 3 }],
    specifications: [
      { key: "Includes", value: "Necklace, earrings, maang tikka" },
      { key: "Metal", value: "22K Gold" },
      { key: "Stones", value: "Polki & pearls" },
    ],
    instagramReels: mockInstagramReels.filter((r) => r.productId === "prod-7"),
    averageRating: 5,
    reviewCount: 19,
  },
  {
    _id: "prod-8",
    name: "Minimal Gold Studs",
    slug: slug("minimal-gold-studs"),
    shortDescription: "Everyday ball studs in 18K gold",
    description:
      "The essential everyday stud — perfectly proportioned gold spheres with secure butterfly backs. A wardrobe staple you'll reach for daily.",
    price: 12999,
    stock: 35,
    status: "active",
    imageUrl: productImage(7),
    category: mockCategories[2],
    brand: mockBrands[0],
    sizes: ["One Size"],
    colors: [metals.gold, metals.white, metals.rose],
    variantStock: buildVariantStock(["One Size"], [metals.gold, metals.white, metals.rose], 5),
    averageRating: 4.8,
    reviewCount: 97,
  },
  {
    _id: "prod-9",
    name: "Diamond Tennis Bracelet",
    slug: slug("diamond-tennis-bracelet"),
    shortDescription: "Continuous line of brilliant diamonds",
    description:
      "A classic tennis bracelet with uniformly set brilliant diamonds in white gold. Flexible, secure, and endlessly elegant.",
    price: 199999,
    compareAtPrice: 229999,
    stock: 6,
    status: "active",
    featured: true,
    imageUrl: productImage(8),
    category: mockCategories[3],
    brand: mockBrands[1],
    sizes: ['6.5"', '7"', '7.5"'],
    colors: [metals.white, metals.gold],
    variantStock: buildVariantStock(['6.5"', '7"', '7.5"'], [metals.white, metals.gold], 2),
    averageRating: 4.9,
    reviewCount: 24,
  },
  {
    _id: "prod-10",
    name: "Silver Charm Anklet",
    slug: slug("silver-charm-anklet"),
    shortDescription: "Sterling silver anklet with delicate charms",
    description:
      "A lightweight sterling silver anklet adorned with miniature charms. Adjustable length for a comfortable, personalised fit.",
    price: 4999,
    stock: 40,
    status: "active",
    isNewArrival: true,
    imageUrl: productImage(5),
    category: mockCategories[5],
    brand: mockBrands[0],
    sizes: ['9"', '10"', '11"'],
    colors: [metals.silver],
    variantStock: buildVariantStock(['9"', '10"', '11"'], [metals.silver], 6),
    averageRating: 4.6,
    reviewCount: 33,
  },
];

export const mockBanners: Banner[] = [
  {
    _id: "banner-1",
    title: "Timeless Fine Jewellery",
    subtitle: "Handcrafted by Sana",
    description: "",
    imageUrl: heroImage(0),
    link: "/products",
    buttonText: "Shop Now",
    type: "hero",
    active: true,
    order: 1,
  },
  {
    _id: "banner-2",
    title: "Bridal Collection",
    subtitle: "New Season",
    description: "",
    imageUrl: heroImage(1),
    link: "/products?category=bridal-collection",
    buttonText: "Explore Bridal",
    type: "hero",
    active: true,
    order: 2,
  },
  {
    _id: "banner-3",
    title: "Personal Styling",
    subtitle: "Via WhatsApp",
    description: "Not sure which piece suits you? Our jewellers will guide you to the perfect match.",
    imageUrl: promoImage(1200),
    link: "/contact",
    type: "promotional",
    active: true,
    order: 1,
  },
];

export const mockFAQs: FAQ[] = [
  { _id: "faq-1", question: "Is your gold hallmarked?", answer: "Yes. All gold pieces are BIS hallmarked. We provide certification and invoice with every purchase for your peace of mind.", order: 1 },
  { _id: "faq-2", question: "Can I customise a ring size?", answer: "Most rings are available in sizes 6–10. For custom sizing or resizing after purchase, message us on WhatsApp and we'll advise on options and timeline.", order: 2 },
  { _id: "faq-3", question: "How do I place an order?", answer: "Select your piece, choose metal and size, then checkout via WhatsApp. We confirm availability and dispatch within 1–2 business days.", order: 3 },
  { _id: "faq-4", question: "What is your return policy?", answer: "Unworn jewellery in original packaging may be returned within 7 days. Custom and engraved pieces are final sale.", order: 4 },
  { _id: "faq-5", question: "How long does delivery take?", answer: "Standard delivery is 3–7 business days across India. Insured shipping is included for orders above ₹25,000.", order: 5 },
];

export const mockTestimonials: Testimonial[] = [
  { _id: "test-1", name: "Fatima Rahman", role: "Bride", content: "My bridal set from Saanz by Sana was breathtaking — every guest asked where it was from. The craftsmanship is exceptional.", rating: 5, featured: true, avatarUrl: avatarImage(0) },
  { _id: "test-2", name: "Ananya Krishnan", role: "Jewellery collector", content: "The Celestial Diamond Ring exceeded my expectations. Elegant packaging and genuine certification. A jeweller you can trust.", rating: 5, featured: true, avatarUrl: avatarImage(1) },
  { _id: "test-3", name: "Zara Malik", role: "Fashion stylist", content: "I recommend saanzbysana to all my clients. The layered chain set is my go-to for editorial shoots — stunning in person.", rating: 5, featured: true, avatarUrl: avatarImage(2) },
];

export const mockReviews: Review[] = [
  { _id: "rev-1", userName: "Khalid M.", rating: 5, title: "Stunning ring", comment: "The Celestial Diamond Ring is even more beautiful in person. Arrived in a gorgeous gift box.", verified: true, approved: true, _createdAt: "2026-02-15" },
  { _id: "rev-2", userName: "Sarah L.", rating: 5, title: "Perfect bridal gift", comment: "Bought the pearl drop earrings for my sister's wedding — she absolutely loved them.", verified: true, approved: true, _createdAt: "2026-02-10" },
  { _id: "rev-3", userName: "Raj P.", rating: 4, title: "Beautiful bangle", comment: "The Heritage Gold Bangle is a work of art. Slightly heavier than expected but worth every rupee.", verified: true, approved: true, _createdAt: "2026-01-28" },
];

export const mockOrders: OrderRequest[] = [
  {
    _id: "order-1",
    orderNumber: "IB-2026-001",
    type: "cart",
    customer: { name: "Fatima Rahman", phone: "9876543210", email: "fatima@email.com", address: "Kochi, India" },
    items: [{ productId: "prod-1", productName: "Celestial Diamond Ring", price: 89999, quantity: 1, subtotal: 89999, size: "7", color: "18K Yellow Gold" }],
    totalItems: 1,
    grandTotal: 89999,
    status: "pending",
    _createdAt: "2026-06-15",
  },
  {
    _id: "order-2",
    orderNumber: "IB-2026-002",
    type: "cart",
    customer: { name: "Ananya Krishnan", phone: "9876543211", address: "Bangalore, India" },
    items: [
      { productId: "prod-2", productName: "Rose Gold Pendant Necklace", price: 24999, quantity: 1, subtotal: 24999, size: '18"', color: "Rose Gold" },
      { productId: "prod-8", productName: "Minimal Gold Studs", price: 12999, quantity: 1, subtotal: 12999, size: "One Size", color: "18K Yellow Gold" },
    ],
    totalItems: 2,
    grandTotal: 37998,
    status: "confirmed",
    _createdAt: "2026-06-14",
  },
];

export const mockUsers: User[] = [
  { _id: "user-1", name: "Fatima Rahman", email: "fatima@email.com", phone: "9876543210", role: "customer", emailVerified: true },
  { _id: "user-2", name: "Ananya Krishnan", email: "ananya@email.com", phone: "9876543211", role: "customer", emailVerified: true },
  { _id: "user-3", name: "Admin", email: "admin@saanzbysana.com", role: "admin", emailVerified: true },
];

export const mockCoupons: Coupon[] = [
  { _id: "coupon-1", code: "IBJEWEL10", description: "10% off your first jewellery purchase", discountType: "percentage", discountValue: 10, minOrderAmount: 10000, usageLimit: 100, usedCount: 23, active: true },
  { _id: "coupon-2", code: "GOLD1000", description: "₹1,000 off orders above ₹50,000", discountType: "fixed", discountValue: 1000, minOrderAmount: 50000, usageLimit: 50, usedCount: 12, active: true },
];

export { JEWELRY_RING_SIZES };
