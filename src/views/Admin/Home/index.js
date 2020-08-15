import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'

import { fetchTestData } from '@/apis'

import './index.less'

const Home = () => {
  return (
    <div id="file">
      <Button
        onClick={async () => {
          try {
            const response = await fetchTestData()
            console.log(response)
          } catch (e) {
            console.log(e)
          }
        }}
      >
        fetch
      </Button>
    </div>
  )
}

export default withRouter(Home)
