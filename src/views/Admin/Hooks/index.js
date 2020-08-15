import React, { useRef } from 'react'
import { useHistoryTravel, useThrottleEffect, useDynamicList, useSelections } from 'ahooks'
import { Button, Input, Checkbox } from 'antd'

import { v4 } from 'uuid'

const Hooks = () => {
  const inputRef = useRef(null)

  const { list, push } = useDynamicList([])

  const { isSelected, toggle, allSelected, partiallySelected, selectAll, unSelectAll } = useSelections(list)

  const { value, setValue, back } = useHistoryTravel('')

  useThrottleEffect(() => {
    console.log(value)
  }, [value], { wait: 1000 })

  return (
    <div>
      <p>Current value: {String(value)}</p>

      <div>
        <Input
          onChange={e => {
            e.persist()
            setValue(e.target.value)
          }}
          onPressEnter={e => {
            e.persist()
            push({
              id: v4(),
              value: e.target.value
            })
            setValue('')
          }}
          ref={inputRef}
          value={value}
        />

        <Checkbox
          checked={allSelected}
          disabled={list.length === 0}
          indeterminate={partiallySelected}
          onChange={e => {
            e.target.checked ? selectAll() : unSelectAll()
          }}
        >全选</Checkbox>

        {
          list.map(item => {
            return (
              <div key={item.id}>
                <Checkbox
                  checked={isSelected(item)}
                  onChange={() => {
                    toggle(item)
                  }}
                >{item.value}</Checkbox>
              </div>
            )
          })
        }

        <Button
          onClick={back}
          type="primary"
        >back</Button>
      </div>
    </div>
  )
}

export default Hooks
