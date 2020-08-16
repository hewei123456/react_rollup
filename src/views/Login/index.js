import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { connect } from 'react-redux'
import { setUserInfo } from '@/store/user'

import './index.less'

const Login = ({ setUserInfo, history }) => {
  return (
    <div id="login-wrapper">
      <div id="login">
        <h1 className="login-title">
          React Admin (v1.1.0)
        </h1>
        <Form
          onFinish={({ username, password }) => {
            const token = 'eyJhbGciOiJIUzUxMiJ9.eyJwYXNzV29yZCI6IiIsInN1YiI6IuS9leS4uiIsIm1pc0lkIjoiOTU3NTMiLCJhZG1pblByb2R1Y3RzIjoiLTEiLCJuZXdNaXNJZCI6Imh3NDQ2NjYiLCJpc3MiOiJvZmZjbiIsImlkIjoxNjYsInVzZXJOYW1lIjoi5L2V5Li6IiwiZXhwIjoxNTkwNzUyOTA1LCJvbGRNaXNJZCI6Imh3OTUzMjQiLCJpYXQiOjE1OTA3MjQxMDUsInJvbCI6W119.sxkCiKjSa_69Rmroli2Z4K4pCyb_JVDZn-gFbWh2uiH7Syyp1y72oiqyGwQklFOlcNWxiQinjygYR3ilRYCmaA'
            const roles = ['administrator']
            setUserInfo({ username, token, roles })
            history.push({ pathname: '/admin/home' })
          }}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: '请输入用户名!'
            }]}
          >
            <Input
              placeholder="请输入用户名"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: '请输入密码！'
            }]}
          >
            <Input.Password
              placeholder="请输入密码"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              htmlType="submit"
              type="primary"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default connect(null, dispatch => {
  return {
    setUserInfo ({ username, token, roles }) {
      dispatch(setUserInfo({ token, roles, username }))
    }
  }
})(withRouter(Login))
