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

export interface UserDetials {
  fullName: string;
  username: string;
  isLoaded: boolean;
  isSignedIn: boolean;
}

export interface DataContextType {
  userData: ShortenedURL[];
  userDetails: UserDetials;
  updateUserDetails: (data: UserDetials) => void;
  getUserData: (user: string) => Promise<void>;
  updateUserData: (data: ShortenedURL) => void;
  incrementClicks: (slug: string) => void;
  deleteData: (slug: string) => void;
}

export interface ChartDataType {
  date: string;
  clicks: number;
}
