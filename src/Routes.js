import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import SuccesScreen from './Screens/SuccesScreen';
import LandingScreen from './Screens/LandingScreen';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact component={HomeScreen} />
        <Route path="/succes" exact component={SuccesScreen} />
        <Route path="/landing" exact component={LandingScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;