import { Route, Switch } from 'wouter'

export function Router() {
  return (
    <Switch>
      <Route path="/">
        <h1>Initial Environment</h1>
      </Route>
    </Switch>
  )
}
