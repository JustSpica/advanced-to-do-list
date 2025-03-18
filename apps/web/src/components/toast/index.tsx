import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { twMerge } from 'tailwind-merge'
import { X } from 'lucide-react'

export const Provider = ToastPrimitive.Provider

export function Viewport({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      className={twMerge(
        'fixed right-0 bottom-0 z-[100] w-[420px] space-y-2 p-4',
        className
      )}
      {...props}
    />
  )
}

export function Root({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Root>) {
  return (
    <ToastPrimitive.Root
      className={twMerge(
        'relative rounded-md border border-zinc-800 bg-zinc-950 p-4 transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-full',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-full',
        className
      )}
      duration={3000}
      {...props}
    />
  )
}

export function Close({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      className={twMerge(
        'absolute top-4 right-4 text-zinc-500 transition-colors',
        'hover:text-zinc-300',
        className
      )}
      {...props}
    >
      <X size={18} />
    </ToastPrimitive.Close>
  )
}

export function Title({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      className={twMerge('text-sm font-medium text-white', className)}
      {...props}
    />
  )
}

export function Description({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      className={twMerge('text-sm text-zinc-500', className)}
      {...props}
    />
  )
}
