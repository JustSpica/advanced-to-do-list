import { Route, Switch } from 'wouter'

import { AppPage } from './app'
import { AuthRoute } from './auth/auth-route'
import { SignInPage } from './sign-in'
import { SignUpPage } from './sign-up'

export function Router() {
  return (
    <Switch>
      <Route path="/">
        <SignUpPage />
      </Route>
      <Route path="/sign-in">
        <SignInPage />
      </Route>
      <Route path="/app">
        <AuthRoute isPrivate redirect="/">
          <AppPage />
        </AuthRoute>
      </Route>
    </Switch>
  )
}
