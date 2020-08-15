import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import { Redirect, Route as NativeRoute } from 'react-router-dom'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let timeoutid

@connect(({ user }) => ({
  token: user.get('token'),
  roles: user.get('roles')
}))
class Route extends React.PureComponent {
  state = {}

  UNSAFE_componentWillMount () {
    NProgress.start()

    const { token } = this.props

    if (timeoutid) {
      clearTimeout(timeoutid)
    }

    timeoutid = setTimeout(() => {
      if (!token) {
        message.warning('您没有访问权限，请登录后访问！', 0.5)
      }
    }, 100)
  }

  componentDidMount () {
    NProgress.done()
  }

  render () {
    const { token = null, roles = [], routerRoles, location: { pathname }, ...rest } = this.props

    // 如果 token 不存在且当前页面不是登录页面
    if (!!token || pathname === '/login') {
      // 如果需要判断权限
      if (routerRoles) {
        // 且权限判断符合，直接渲染页面
        if (roles.filter(role => routerRoles.indexOf(role) > -1).length > 0)
          return <NativeRoute {...rest} />

        // 否则重定向到403页面
        else
          return <Redirect to="/admin/error403" />
      }
      // 否则直接渲染页面
      else {
        return <NativeRoute {...rest} />
      }
    }
    // 否则重定向到登录页面
    return <Redirect to="/login" />
  }
}

export default Route
