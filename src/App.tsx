import React from 'react';
import logo from './logo.svg';
import { Route, Switch, withRouter } from 'react-router-dom';
import './assets/css/app.scss';
import './assets/css/_fonts.scss';
import routes from './routes';

function App() {
  return (
    <Switch>
    {routes.map((route, idx) => (
       <Route
           path={route.path}
           exact={route.exact}
           component={route.component}
           key={idx}
       />
    ))}
    </Switch>
  );
}

export default withRouter(App);