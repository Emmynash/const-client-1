import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { withAuthentication } from './component/session';
import Login from './component/Auth/login';
import ErrorPageContainer from './container/404';
import Layout from './component/Layout';

function App() {
  return (
    <div >
      <Layout>
          <Switch>
          <Route path='/' exact component={Login} />
          <Route component={ErrorPageContainer} />
          </Switch>
      </Layout>
    </div>
  );
}

export default withAuthentication(App);
