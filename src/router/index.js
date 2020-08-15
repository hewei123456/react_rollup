import React from 'react'
import { HashRouter, BrowserRouter, Switch, Redirect } from 'react-router-dom'

import renderRoute from './renderRoute'
import Route from './Route'
import menu from './menu'

import Login from '@/views/Login'

export default () => (
  <BrowserRouter basename="/react-admin">
    <Switch>
      <Route
        component={Login}
        path="/login"
      />
      {
        renderRoute(menu)
      }
      <Redirect to="/admin" />
    </Switch>
  </BrowserRouter>
)

export { menu }
