import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './Welcome';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import CompanyDetails from './CompanyDetails';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import Profile from './Profile';
import NotFound from './NotFound';
import User from './User';

const Routes = ({ signUp, login }) => {
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
        <LoginForm login={login} />
      </Route>
      <Route exact path="/signup">
        <SignupForm signUp={signUp} />
      </Route>
      <Route exact path="/logout">
        <h1>This is logout route</h1>
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
};

export default Routes;
