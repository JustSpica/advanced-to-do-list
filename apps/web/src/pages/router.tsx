import { Route, Switch } from 'wouter'

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
    </Switch>
  )
}
