'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/hero-section'
import { UrlShortenerForm } from '@/components/url-shortener-form'
import { UrlList } from '@/components/url-list'
import { StatsCard } from '@/components/stats-card'
import { PricingSection } from '@/components/pricing-section'
import { FeaturesSection } from '@/components/features-section'
import { AnalyticsSection } from '@/components/analytics-section'
import { getHistory } from '@/lib/mock-data'

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [hasLinks, setHasLinks] = useState(false)
  
  useEffect(() => {
    const history = getHistory()
    setHasLinks(history.length > 0)
  }, [refreshFlag])
  
  const handleUrlShortened = () => {
    setRefreshFlag(prev => prev + 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 pb-16">
        <UrlShortenerForm onSuccess={handleUrlShortened} />
        <UrlList />
        {hasLinks && <StatsCard />}
      </div>

      <FeaturesSection />
      <PricingSection />
      <AnalyticsSection />
    </div>
  )
}