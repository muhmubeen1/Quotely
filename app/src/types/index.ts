export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  totalQuotes: number;
  lastAdded: string;
  color: string;
}

export interface Quote {
  id: string;
  text: string;
  bookId: string;
  bookTitle: string;
  author: string;
  page?: number;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'pro' | 'premium';
  totalBooks: number;
  totalQuotes: number;
  joinedAt: string;
}

export interface Activity {
  id: string;
  type: 'quote_added' | 'book_added' | 'favorite' | 'export';
  description: string;
  timestamp: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

export interface AudioItem {
  id: string;
  quoteId: string;
  quoteText: string;
  bookTitle: string;
  duration: number;
  url: string;
}
