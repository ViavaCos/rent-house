// 这里负责导入各种组件

import React from 'react';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import City from './pages/City/index'
import NotFound from './pages/404'
import Map from './pages/Map/index'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path='/home' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/city' component={City}></Route>
          <Route path='/map' component={Map}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
