import { useContext } from 'react'

import { Context } from './toaster'

export function useToast() {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useToast must be inside Toaster')
  }

  return context
}
