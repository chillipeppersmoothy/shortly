'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { LinkIcon } from 'lucide-react'

export function HeroSection() {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32 md:py-40 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-[-1]" />
      
      {/* Decorative elements */}
      <div className="absolute top-[-10%] right-[20%] w-[40%] h-[40%] bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-[-5%] left-[10%] w-[30%] h-[30%] bg-chart-2/5 rounded-full filter blur-3xl" />
      
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-2">
            Simplify your links
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Create short, memorable links that redirect to your long URLs.
            Track clicks, generate QR codes, and manage all your links in one place.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" className="px-8 py-6 text-lg gap-2">
            <LinkIcon className="h-5 w-5" />
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
            Learn More
          </Button>
        </motion.div>
      </div>
    </div>
  )
}