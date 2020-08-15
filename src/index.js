import '@babel/polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import Login from './views/Login'

class Todo extends Component {
  state = {}

  render () {
    return (
      <div>
        110
      </div>
    )
  }
}


const App = () => (
  <div>
    456
    <Login />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
