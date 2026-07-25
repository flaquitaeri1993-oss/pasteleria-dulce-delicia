export type CategoryId = 'all' | 'pasteles' | 'cheesecakes' | 'gelatinas' | 'cupcakes' | 'fresas' | 'vasitos';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  price: number;
  description: string;
  longDescription?: string;
  imageUrl: string;
  badge?: string;
  inVitrina: boolean; // Available today in showcase
  portions?: string;
  prepTime?: string;
  ingredients?: string[];
  tags?: string[]; // e.g., 'Sin Gluten', 'Sin Azúcar', '100% Artesanal', 'Keto Friendly', 'Especialidad'
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: {
    sizeOrPortions?: string;
    dedicationMessage?: string;
    specialNotes?: string;
  };
}

export interface CustomCakeRequest {
  spongeFlavor: string;
  filling: string;
  frostingStyle: string;
  portions: number;
  eventDate: string;
  eventTime: string;
  themeOrColors: string;
  dedicationMessage: string;
  referenceNotes: string;
  contactName: string;
  contactPhone: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'category' | 'product' | 'custom_builder' | 'cart' | 'whatsapp' | 'faq';
    payload?: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
