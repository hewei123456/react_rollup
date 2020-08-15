import React from 'react'
import { hasChinese } from '@/utils'
import { Popover } from 'antd'

const Text = props => {
  let { text, short, long, onClick, pointer } = props
  if ((hasChinese(text) && text.length > short) || (!hasChinese(text) && text.length > long)) {
    return (
      <Popover
        content={text}
        placement="topLeft"
        them="light"
      >
        <div
          className={`text-wrapper ${pointer ? 'pointer' : ''}`}
          onClick={onClick}
        >
          {text}
          <span className="dot hide" />
        </div>
      </Popover>
    )
  } else {
    return (
      <div
        className={`text-wrapper ${pointer ? 'pointer' : ''}`}
        onClick={onClick}
      >
        {text}
        <span className="dot hide" />
      </div>
    )
  }
}

export default Text
