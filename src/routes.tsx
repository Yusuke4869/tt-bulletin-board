import { Route, Switch } from "wouter";

import { Home, CreateThread, Thread } from "~/pages";

import type { FC } from "react";

const Router: FC = () => (
  <Switch>
    <Route component={Home} path="/" />
    <Route component={CreateThread} path="/threads/new" />
    <Route component={Thread} path="/threads/:threadId" />
    <Route>404, Not Found</Route>
  </Switch>
);

export default Router;
