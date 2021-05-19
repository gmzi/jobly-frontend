import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import CompanyDetails from './CompanyDetails'
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import Profile from './Profile';
import NotFound from './NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        <Companies />
      </Route>
      <Route exact path="/companies/:handle">
        <CompanyDetails />
      </Route>
      <Route exact path="/jobs">
        <Jobs />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/logout">
        <SignupForm />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Redirect to="/" />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
