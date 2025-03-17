import { Route, Switch } from 'wouter'

import { AppPage } from './app'
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
        <AppPage />
      </Route>
    </Switch>
  )
}
