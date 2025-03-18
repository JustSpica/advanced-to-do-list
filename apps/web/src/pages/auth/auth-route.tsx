import { Redirect } from 'wouter'

export type AuthRouteProps = {
  children: React.ReactNode
  redirect: string
  isPrivate?: boolean
}

export function AuthRoute({ children, redirect, isPrivate }: AuthRouteProps) {
  const accessToken = localStorage.getItem('access_token')

  if (isPrivate) {
    return accessToken ? children : <Redirect to={redirect} />
  }

  return !accessToken ? children : <Redirect to={redirect} />
}
