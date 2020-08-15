import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Button } from 'antd'

import { useHistoryTravel } from 'ahooks'

import './index.less'

const Item = ({ value }) => {
  switch (value) {
    case 'tabs':
      return (
        <div>tabs</div>
      )
    case 'carousel':
      return (
        <div>carousel</div>
      )
  }
}
const SortableItem = SortableElement(({ value }) => (<Item value={value} />))

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          index={index}
          key={value}
          value={value}
        />
      ))}
    </ul>
  )
})

const Sortable = () => {
  const { value: items, setValue: setItems, back: undo, backLength } = useHistoryTravel(['tabs', 'carousel'])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex)
      setItems(arrayMove(items, oldIndex, newIndex))
  }

  return (
    <>
      <Button
        disabled={backLength === 0}
        onClick={undo}
        type="primary"
      >
        回退
      </Button>

      <SortableList
        distance={15}
        items={items}
        onSortEnd={onSortEnd}
      />
    </>
  )
}

export default Sortable
