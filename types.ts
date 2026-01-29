
export enum TemplateType {
  BUSINESS = 'business',
  MINIMALIST = 'minimalist',
  CRYPTO = 'crypto',
  ECOMMERCE = 'ecommerce',
  CHAT = 'chat'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface GeneratedSite {
  html: string;
  css: string;
  js: string;
  templateType: TemplateType;
  prompt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
