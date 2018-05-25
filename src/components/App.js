import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import * as routes from '../shared/routes';
import authentication from '../shared/authentication';

import NavigationLeft from './NavigationLeft';
import NavigationRight from './NavigationRight';
import LandingPage from '../pages/landing';
import DashboardPage from '../pages/dashboard';
import BestLovedPage from '../pages/best-loved';
import AddPage from '../pages/add';
import ProfilePage from '../pages/profile';


const App = () => {
  return (
    <Router history={null}>
      <div className="background" style={{position: 'relative'}}>
        <NavigationLeft/>
        <Route exact path={routes.LANDING} component={LandingPage}/>
        <Route exact path={routes.DASHBOARD} component={DashboardPage}/>
        <Route exact path={routes.BEST_LOVED} component={BestLovedPage}/>
        <Route exact path={routes.ADD} component={AddPage}/>
        <Route exact path={routes.PROFILE} component={ProfilePage}/>
        <NavigationRight/>
      </div>
    </Router>
  )
};

export default authentication(App);
