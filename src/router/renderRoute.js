import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import qs from 'query-string'
import Route from './Route'

const Empty = ({ children }) => (<div>{children}</div>)

const renderRoute = route => {
  const RouteComponent = route.component || Empty

  return (
    <Route
      exact={route.exact}
      key={route.path}
      path={route.path}
      render={props => {
        const { search } = props.location
        props.location.meta = route.meta || {}
        props.location.qs = qs.parse(search)

        return (
          <RouteComponent {...props}>
            {
              route.children && route.children.length > 0 ? (
                <Switch>
                  {
                    route.children.map(r => renderRoute(r))
                  }
                  {
                    route.redirect ?
                      <Redirect to={route.redirect} /> :
                      <Redirect to="/admin/error404" />
                  }
                </Switch>
              ) : null
            }
          </RouteComponent>
        )
      }}
      routerRoles={route.roles}
      title={route.title}
    />
  )
}

export default renderRoute
