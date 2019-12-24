// 这里负责导入各种组件

import React from 'react';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/404'
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
          <Route component={NotFound}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
