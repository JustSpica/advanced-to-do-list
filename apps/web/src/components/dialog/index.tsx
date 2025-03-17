import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { twMerge } from 'tailwind-merge'

export const Root = DialogPrimitive.Root

export const Trigger = DialogPrimitive.Trigger

export const Portal = DialogPrimitive.Portal

export const Close = DialogPrimitive.Close

export function Overlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={twMerge(
        'fixed inset-0 z-50 bg-black/80',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className
      )}
      {...props}
    />
  )
}

export function Content({
  children,
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <Portal>
      <Overlay />
      <DialogPrimitive.Content
        className={twMerge(
          'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border border-zinc-800 bg-zinc-950 p-6',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-[5%]',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-[5%]',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={twMerge(
            'absolute top-4 right-4 text-zinc-500 transition-colors',
            'hover:cursor-pointer hover:text-zinc-300'
          )}
        >
          <X size={18} />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </Portal>
  )
}

export function Title({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={twMerge(
        'text-lg leading-none font-semibold tracking-tight text-white',
        className
      )}
      {...props}
    />
  )
}

export function Description({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={twMerge('text-sm text-zinc-500', className)}
      {...props}
    />
  )
}
