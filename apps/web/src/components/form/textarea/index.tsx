import React from 'react'
import { twMerge } from 'tailwind-merge'

export type TextareaProps = React.ComponentProps<'textarea'>

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={twMerge(
        'w-full bg-transparent px-4 py-2 text-sm text-white transition-shadow outline-none',
        'rounded-md border border-zinc-800 ring-zinc-800',
        'focus-visible:ring-2',
        'placeholder:text-zinc-400',
        'selection:bg-teal-900 selection:text-teal-200',
        className
      )}
      {...props}
    />
  )
}
