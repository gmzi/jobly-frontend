import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import CompanyJobs from './CompanyJobs';
import Jobs from './Jobs';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import Profile from './Profile';
import NotFound from './NotFound';

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
        <CompanyJobs />
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
