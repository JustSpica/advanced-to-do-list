import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './lib/react-query'
import { Router } from './pages/router'

import { Toaster } from './components/toast/toaster'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster>
        <Router />
      </Toaster>
    </QueryClientProvider>
  )
}
