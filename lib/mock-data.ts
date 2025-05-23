// This is mock data to simulate a backend service
// In a real application, this would come from an API or database

export interface ShortenedURL {
  id: string
  originalUrl: string
  shortUrl: string
  slug: string
  createdAt: Date
  clicks: number
  qrCode?: boolean
  expiresAt?: Date
}

// Generate a random short URL
export const generateShortUrl = (slug?: string): string => {
  const baseUrl = 'https://short.fy/'
  const randomSlug = slug || Math.random().toString(36).substring(2, 8)
  return `${baseUrl}${randomSlug}`
}

export const shortenUrl = async (
  url: string,
  customSlug?: string
): Promise<ShortenedURL> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  const slug = customSlug || Math.random().toString(36).substring(2, 8)
  const shortUrl = generateShortUrl(slug)
  
  const newShortenedUrl: ShortenedURL = {
    id: Math.random().toString(36).substring(2, 15),
    originalUrl: url,
    shortUrl,
    slug,
    createdAt: new Date(),
    clicks: 0,
    qrCode: false,
  }
  
  // Add to history
  const history = getHistory()
  history.unshift(newShortenedUrl)
  setHistory(history)
  
  return newShortenedUrl
}

// Local storage helpers for URL history
export const getHistory = (): ShortenedURL[] => {
  if (typeof window === 'undefined') return []
  
  const history = localStorage.getItem('url-history')
  if (!history) return []
  
  try {
    const parsed = JSON.parse(history)
    return parsed.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      expiresAt: item.expiresAt ? new Date(item.expiresAt) : undefined,
    }))
  } catch (e) {
    return []
  }
}

export const setHistory = (history: ShortenedURL[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('url-history', JSON.stringify(history))
}

export const incrementClicks = (id: string) => {
  const history = getHistory()
  const updatedHistory = history.map(url => 
    url.id === id ? { ...url, clicks: url.clicks + 1 } : url
  )
  setHistory(updatedHistory)
}

export const deleteUrl = (id: string) => {
  const history = getHistory()
  const updatedHistory = history.filter(url => url.id !== id)
  setHistory(updatedHistory)
}