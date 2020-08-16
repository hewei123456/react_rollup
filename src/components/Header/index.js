import React from 'react'
import { withRouter } from 'react-router-dom'

import { clearUserInfo } from '@/store/user'
import { connect } from 'react-redux'

import './index.less'

const Header = ({ username, clearUserInfo, history }) => (
  <header id="header">
    <div className="logo">
      <img
        alt="true"
        className="logo-img left"
        src={'./images/logo.png'}
      />
    </div>

    <div className="operation">
      <a>{username}</a>
      <a
        className="logout"
        onClick={() => {
          clearUserInfo()
          history.push('/login')
        }}
      >
        退出
      </a>
    </div>
  </header>
)

export default connect(({ user }) => ({
  username: user.get('username')
}), dispatch => {
  return {
    clearUserInfo () {
      dispatch(clearUserInfo())
    }
  }
})(withRouter(Header))

