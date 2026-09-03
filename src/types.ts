export interface POSKeypoint {
  number: number;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: 'tools' | 'cash-register' | 'video' | 'laptop' | 'globe';
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  posKeypoints?: POSKeypoint[];
  actionLabel: string;
  whatsappMessage: string;
  popularFor: string;
  priceBadge?: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: 'laptop' | 'desktop' | 'cctv' | 'pos' | 'accessory';
  condition: 'Brand New' | 'Certified Refurbished';
  priceZAR: number;
  originalPriceZAR?: number;
  specs: string[];
  warranty: string;
  inStock: boolean;
  highlight?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  serviceCategory: 'repairs' | 'pos' | 'cctv' | 'hardware' | 'digital';
  serviceUsed: string;
  date: string;
  feedback: string;
  verified: boolean;
  avatarInitials: string;
  businessType: string;
}

export interface WorkshopInfo {
  name: string;
  company: string;
  address: string;
  street: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  manager: string;
  email?: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  googleMapsUrl: string;
}
