export type ToastPayload = {
  description: string
  id: string
  open: boolean
  title: string
  variant: 'error' | 'warn' | 'success'
}

type Action =
  | {
      type: 'ADD_TOAST'
      payload: ToastPayload
    }
  | {
      type: 'REMOVE_TOAST'
      payload: Pick<ToastPayload, 'id'>
    }
  | {
      type: 'DISMISS_TOAST'
      payload: Pick<ToastPayload, 'id'>
    }

export function reducer(state: ToastPayload[], action: Action) {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]
    case 'DISMISS_TOAST':
      return state.map((toast) => {
        if (toast.id === action.payload.id) {
          return {
            ...toast,
            open: false
          }
        }

        return toast
      })
    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.payload.id)
  }
}
