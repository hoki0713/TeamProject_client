import * as React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";

function Page() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </Switch>);
}

export default Page;
