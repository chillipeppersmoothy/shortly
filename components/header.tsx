'use client'

import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { LinkIcon } from 'lucide-react'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b'
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">shortify</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="#">Features</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#">Pricing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#">API</Link>
          </Button>
          <ModeToggle />
          <Button asChild variant="outline">
            <Link href="#">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="#">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}