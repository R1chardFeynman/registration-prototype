import React from "react";
import { Container } from "@material-ui/core";
import { SignUp } from "components/SignUp/SignUp";
import { Redirect, Route, Switch } from "react-router";
import { Profile } from "components/Profile/Profile";
import { observer } from "mobx-react-lite";
import { ModalContainer } from "components/Modals/ModalContainer";
import { useStore } from "stores";

export const App = observer(() => {
  const { user, isLoading } = useStore().UserStore;
  return (
    <Container component="main">
      {!isLoading && (
        <Switch>
          {!user && (
            <Route path="/register">
              <SignUp />
            </Route>
          )}
          {user && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          <Route path="/">
            <Redirect to={user ? "/profile" : "/register"} />
          </Route>
        </Switch>
      )}
      <ModalContainer />
    </Container>
  );
});
