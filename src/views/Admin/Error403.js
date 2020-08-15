import React from 'react'
import { Empty, Button } from 'antd'
import { noData } from '@/static'

const Error403 = ({ history }) => (
  <Empty
    description={
      <span>
        403 Forbidden 您没有访问权限!
      </span>
    }
    image={noData}
    imageStyle={
      {
        height: 184
      }
    }
    style={
      {
        marginTop: 150
      }
    }
  >
    <Button
      onClick={() => {
        history.push('/admin/home')
      }}
      type="primary"
    >返回首页</Button>
  </Empty>
)

export default Error403
