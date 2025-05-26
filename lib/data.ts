import { ShortenedURL } from "@/interface/types";

export const shortenUrl = async (
  url: string,
  hasQrCode: boolean,
  customSlug: string,
  expiresAt?: Date
): Promise<ShortenedURL> => {
  const newShortenedUrl: ShortenedURL = {
    url,
    slug: customSlug.length ? customSlug : "",
    createdAt: new Date(),
    expiresAt: expiresAt!,
    clicks: 0,
    hasQrCode: hasQrCode ? hasQrCode : false,
  };

  return newShortenedUrl;
};