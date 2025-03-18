import { createContext, useReducer } from 'react'
import { CircleAlert, CircleCheck, CircleX, Sparkles } from 'lucide-react'

import { ToastPayload, reducer } from './toaster-reducer'

import { Toast } from '../'

export type ToasterContextProps = {
  toast(payload: Omit<ToastPayload, 'id' | 'open'>): void
}

export const Context = createContext<ToasterContextProps | null>(null)

export type ToasterProps = {
  children: React.ReactNode
}

export function Toaster({ children }: ToasterProps) {
  const [toasts, dispatch] = useReducer(reducer, [])

  function remove(id: string) {
    dispatch({ payload: { id }, type: 'REMOVE_TOAST' })
  }

  function toast(payload: Omit<ToastPayload, 'id' | 'open'>) {
    const id = Date.now().toString()

    dispatch({ payload: { ...payload, id, open: true }, type: 'ADD_TOAST' })
  }

  function removeQueue(id: string) {
    dispatch({ payload: { id }, type: 'DISMISS_TOAST' })

    setTimeout(() => {
      remove(id)
    }, 100)
  }

  return (
    <Context.Provider value={{ toast }}>
      <Toast.Provider>
        {children}
        {toasts.map((item) => (
          <Toast.Root
            key={item.id}
            duration={3000}
            className="flex gap-3"
            open={item.open}
            onOpenChange={() => removeQueue(item.id)}
          >
            <Toast.Close />
            {item.variant === 'error' ? (
              <CircleX className="text-red-500" size={20} />
            ) : item.variant === 'success' ? (
              <CircleCheck className="text-green-500" size={20} />
            ) : (
              <CircleAlert className="text-orange-500" size={20} />
            )}
            <div className="space-y-1">
              <Toast.Title className="flex items-center gap-1">
                <Sparkles className="text-zinc-500" size={16} />
                {item.title}
              </Toast.Title>
              <Toast.Description>{item.description}</Toast.Description>
            </div>
          </Toast.Root>
        ))}
        <Toast.Viewport />
      </Toast.Provider>
    </Context.Provider>
  )
}
