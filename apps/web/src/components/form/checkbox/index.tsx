import { Check } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={twJoin(
        'h-[18px] w-[18px] cursor-pointer rounded-full border-2 border-white text-gray-100',
        'data-[state=checked]:bg-white'
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <Check className="h-4 w-4 text-black" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
