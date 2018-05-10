import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import * as routes from '../routes';

import {NavigationLeft, NavigationRight} from '../components/Navigation';
import LandingPage from '../pages/landing';

const App = () => {
  return (
    <Router>
      <div style={{position: 'relative'}}>
        <NavigationLeft/>
        <Route exact path={routes.LANDING} component={LandingPage}/>
        <NavigationRight/>
      </div>
    </Router>
  )
};

export default App;
