import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import * as routes from '../shared/routes';
import authentication from '../shared/authentication';

import {NavigationLeft, NavigationRight} from '../components/Navigation';
import DashboardPage from '../pages/dashboard';
import RegisterPage from '../pages/register';
import LogInPage from '../pages/login';
import AddPage from '../pages/add';

const App = () => {
  return (
    <Router>
      <div className="background" style={{position: 'relative'}}>
        <NavigationLeft/>
        <Route exact path={routes.DASHBOARD} component={DashboardPage}/>
        <Route exact path={routes.REGISTER} component={RegisterPage}/>
        <Route exact path={routes.LOG_IN} component={LogInPage}/>
        <Route exact path={routes.ADD} component={AddPage}/>
        <NavigationRight/>
      </div>
    </Router>
  )
};

export default authentication(App);
