export interface ShortenedURL {
  url: string;
  slug: string;
  user: string;
  createdAt: Date;
  clicks: number;
  hasQrCode: boolean;
  expiresAt?: Date;
  qrCode?: string | null;
}

export interface ShortURLResponse {
  message: string;
  slug: string;
  clicks: number;
  qr: string | null;
  expiresAt: Date | null;
}

export interface UrlResponse {
  slug: string;
  clicks: number;
  expiresAt: Date | null;
  qrCode: string;
}

export interface DataContextType {
  userData: ShortenedURL[];
  getUserData: (user: string) => Promise<void>;
  updateUserData: (data: ShortenedURL) => void;
  incrementClicks: (slug: string) => void;
  deleteData: (slug: string) => void;
}

export interface ChartDataType {
  date: string;
  clicks: number;
}
