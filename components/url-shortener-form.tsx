'use client'

import { FormEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { CalendarIcon, LinkIcon, QrCodeIcon, Wand2Icon } from 'lucide-react'
import { shortenUrl } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'

interface UrlShortenerFormProps {
  onSuccess?: () => void
}

export function UrlShortenerForm({ onSuccess }: UrlShortenerFormProps) {
  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [isCustomSlug, setIsCustomSlug] = useState(false)
  const [isQrCode, setIsQrCode] = useState(false)
  const [isExpiration, setIsExpiration] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!url) {
      setError('Please enter a URL')
      return
    }
    
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
      return
    }
    
    setError('')
    setIsSubmitting(true)
    
    try {
      await shortenUrl(url, isCustomSlug ? customSlug : undefined)
      setUrl('')
      setCustomSlug('')
      if (onSuccess) onSuccess()
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto backdrop-blur-sm bg-card/95">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Shorten your URL</h2>
            <p className="text-muted-foreground">
              Paste your long URL below to create a short link
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LinkIcon className="w-5 h-5 text-muted-foreground" />
              </div>
              <Input
                type="url"
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                className="pl-10"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="min-w-[100px] transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <Wand2Icon className="mr-2 h-4 w-4" />
                  Shorten
                </>
              )}
            </Button>
          </div>
          
          {error && (
            <div className="text-destructive text-sm">{error}</div>
          )}
          
          <Tabs defaultValue="options" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="customization">Customization</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="options" className="space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-slug">Custom slug</Label>
                  <div className="text-sm text-muted-foreground">
                    Create a memorable short link
                  </div>
                </div>
                <Switch
                  id="custom-slug"
                  checked={isCustomSlug}
                  onCheckedChange={setIsCustomSlug}
                />
              </div>
              
              {isCustomSlug && (
                <div className="pt-2">
                  <Input
                    placeholder="your-custom-slug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Your URL will be: https://short.fy/{customSlug || 'your-custom-slug'}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="customization" className="space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="qr-code">QR code</Label>
                  <div className="text-sm text-muted-foreground">
                    Generate a QR code for your short link
                  </div>
                </div>
                <Switch
                  id="qr-code"
                  checked={isQrCode}
                  onCheckedChange={setIsQrCode}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="expiration">Link expiration</Label>
                  <div className="text-sm text-muted-foreground">
                    Set an expiration date for your link
                  </div>
                </div>
                <Switch
                  id="expiration"
                  checked={isExpiration}
                  onCheckedChange={setIsExpiration}
                />
              </div>
              
              {isExpiration && (
                <div className="pt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !expirationDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expirationDate ? format(expirationDate, "PPP") : "Select expiration date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={expirationDate}
                        onSelect={setExpirationDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </form>
      </CardContent>
    </Card>
  )
}