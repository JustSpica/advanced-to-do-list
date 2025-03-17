import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twJoin, twMerge } from 'tailwind-merge'

const button = tv({
  base: twJoin(
    'flex items-center justify-center gap-1 rounded-md px-3 py-2 text-sm',
    'transition-colors hover:cursor-pointer disabled:cursor-not-allowed'
  ),
  variants: {
    group: {
      icon: 'p-2'
    },
    variant: {
      ghost: 'bg-transparent text-white hover:bg-zinc-800',
      primary: 'bg-zinc-200 text-black hover:bg-zinc-300',
      outline: 'text-white ring-1 ring-zinc-800 hover:bg-zinc-800'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof button>

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(button(props), className)}
      {...props}
    />
  )
}
