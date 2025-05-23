'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  value: string
  className?: string
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
}

export function CopyButton({ value, className, variant = 'outline' }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <Button
      size="sm"
      variant={variant}
      className={cn('transition-all duration-200', className)}
      onClick={copyToClipboard}
    >
      {hasCopied ? (
        <>
          <Check className="mr-1 h-4 w-4" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="mr-1 h-4 w-4" />
          <span>Copy</span>
        </>
      )}
    </Button>
  )
}