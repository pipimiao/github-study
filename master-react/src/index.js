import React from 'react';
import {render} from 'react-dom';

import App from './App';
import './index.less';

import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom';

import { mainRouter } from './routes';
render(
  <Router>
    <Switch>
      <Route path="/admin" render={(routeProps)=>{
        //TODO 权限  需要登录才能访问admin
        return <App {...routeProps}/>
      }}/>
      {
        mainRouter.map(route=>{
          return <Route key={route.pathname} path={route.pathname} component={route.component}/>
        })
      }
      <Redirect to="/admin" from ="/" exact/>
      <Redirect to="/404"/>
    </Switch>
  </Router>
  ,
  document.getElementById('root')
)