import React, { useState } from 'react'
import { v4 } from 'uuid'
import { Button, Input } from 'antd'
import { List, Map } from 'immutable'

const Immutable = props => {
  const [list, setList] = useState(List([]))

  return (
    <div id="data">
      <a
        href="https://juejin.im/entry/5992ca405188252425645017"
        target="_blank"
      >immutable 常用api</a>

      <Button
        onClick={() => {
          setList(list.push(Map({
            id: v4(),
            value: ''
          })))
        }}
      >add</Button>

      {
        list.map((item, index) => {
          return (
            <div
              key={item.get('id')}
            >
              <Input
                onChange={e => {
                  setList(list.setIn([index, 'value'], e.target.value))
                }}
                value={item.get('value')}
              />
              <Button
                onClick={() => {
                  setList(list.delete(index))
                }}
              >delete</Button>
            </div>
          )
        })
      }
    </div>
  )

}
export default Immutable
