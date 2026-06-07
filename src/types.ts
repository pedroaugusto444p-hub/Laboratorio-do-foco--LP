export interface TabContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  items: string[];
  image: string;
}

export interface BonusItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  value: string;
  image: string;
}

export interface TestimonialChat {
  id: string;
  name: string;
  avatar: string;
  status: string;
  messages: { text: string; time: string; origin: "client" | "user" }[];
}

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  cents: string;
  pixPrice: string;
  installments: string;
  originalPrice?: string;
  annotation?: string;
  badge?: string;
  features: string[];
  nonFeatures?: string[];
  ctaText: string;
  highlighted: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
