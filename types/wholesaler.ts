
export interface WholesalerType {
  id: string;
  name: string;
  image: string;
  logo: string;
  country: string;
  location: string;
  coffeeTypes: string[];
  description: string;
  establishedYear: string;
  joinDate?: string;
  isAuthorized?: boolean;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  certifications: string[];
  stats: {
    products: number;
    yearlyExport: string;
    rating: number;
    clients: string;
  };
}
