import * as React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CommonPage from './CommonPage';
import AccountPage from './AccountPage';

function Page() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/account">
        <AccountPage />
      </Route>
      <Route>
        <CommonPage />
      </Route>
    </Switch>
    );
}

export default Page;
