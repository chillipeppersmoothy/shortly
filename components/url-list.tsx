'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShortenedURL, getHistory, incrementClicks, deleteUrl } from '@/lib/mock-data'
import { CopyButton } from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'
import { 
  BarChart, 
  Clock, 
  ExternalLink, 
  QrCode, 
  Share2, 
  Trash2,
  BarChart3,
  ArchiveIcon
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { format } from 'date-fns'

export function UrlList() {
  const [urls, setUrls] = useState<ShortenedURL[]>([])
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null)
  
  useEffect(() => {
    setUrls(getHistory())
  }, [refreshFlag])
  
  const handleOpenUrl = (url: ShortenedURL) => {
    incrementClicks(url.id)
    setRefreshFlag(prev => prev + 1)
    window.open(url.originalUrl, '_blank')
  }
  
  const handleCopyClick = (url: string) => {
    navigator.clipboard.writeText(url)
  }
  
  const handleDeleteClick = (id: string) => {
    setUrlToDelete(id)
    setDeleteDialogOpen(true)
  }
  
  const confirmDelete = () => {
    if (urlToDelete) {
      deleteUrl(urlToDelete)
      setRefreshFlag(prev => prev + 1)
      setDeleteDialogOpen(false)
      setUrlToDelete(null)
    }
  }

  const handleShare = async (url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shortened URL',
          text: 'Check out this shortened URL',
          url
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  if (urls.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 bg-card/95">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <ArchiveIcon className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-medium">No URLs yet</h3>
          <p className="text-muted-foreground mt-2">
            Your shortened URLs will appear here
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Your links</h2>
        <Button variant="outline" size="sm" onClick={() => setRefreshFlag(prev => prev + 1)}>
          Refresh
        </Button>
      </div>
      
      {urls.map((url) => (
        <Card key={url.id} className="overflow-hidden bg-card/95 border transition-all duration-200 hover:shadow-md">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
              <div>
                <div className="flex flex-col mb-2">
                  <div className="flex items-center text-primary font-medium mb-1 text-lg">
                    {url.shortUrl}
                    <CopyButton value={url.shortUrl} className="ml-2" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 truncate">
                    <span 
                      className="hover:underline cursor-pointer" 
                      onClick={() => handleOpenUrl(url)}
                      title={url.originalUrl}
                    >
                      {url.originalUrl}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {format(url.createdAt, 'PPp')}
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-3 w-3 mr-1" />
                    {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                  </div>
                  {url.expiresAt && (
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Expires: {format(url.expiresAt, 'PP')}
                    </div>
                  )}
                  {url.qrCode && (
                    <div className="flex items-center">
                      <QrCode className="h-3 w-3 mr-1" />
                      QR Code
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleShare(url.shortUrl)}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleOpenUrl(url)}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => handleDeleteClick(url.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this shortened URL. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}