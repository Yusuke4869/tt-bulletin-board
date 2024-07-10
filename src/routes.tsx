import { Route, Switch } from "wouter";

import { Home, CreateThread } from "~/pages";

import type { FC } from "react";

const Router: FC = () => (
  <Switch>
    <Route component={Home} path="/" />
    <Route component={CreateThread} path="/threads/new" />
    <Route>404, Not Found</Route>
  </Switch>
);

export default Router;
