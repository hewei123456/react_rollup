import React from 'react'
import { Empty, Button } from 'antd'
import { noData } from '@/static'

const Error404 = ({ history }) => (
  <Empty
    description={
      <span>
        404 您访问的资源不存在!
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

export default Error404
