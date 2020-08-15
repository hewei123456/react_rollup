import React from 'react'
import './index.less'

const Title = props => {
  let { title } = props
  return (
    <div className="block-title">
      <span className="block-title-vertical" />
      <span className="block-title-text">{title}</span>
      {props.children}
    </div>
  )
}

export default Title
