import React from 'react'
import { Button, Row, Col, Divider, Input, Empty, Menu, Modal } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { useActiveId, useModal } from './hooks'
import { connect } from 'react-redux'
import { filesUndo, filesRedo, updateFileContent, deleteFile, clearFileList } from '@/store/files'

import './index.less'

const File = ({ undo, redo, updateFileContent, deleteFile, clearFileList, files }) => {
  const [...fileList] = files.values()

  /* -------hooks------- */
  const [visible, openId, modalInputRef, inputName, setInputName, onOk, onCancel, onOpenModal] = useModal()
  const [activeId, onSetActiveId, onClearActiveId, onDeleteActiveId] = useActiveId()

  return (
    <div id="file">
      <Modal
        cancelText="取消"
        okText="确定"
        onCancel={onCancel}
        onOk={onOk}
        title={openId ? '修改文件名称' : '新增文件'}
        visible={visible}
      >
        <Input
          autoFocus
          onChange={e => {
            setInputName(e.target.value)
          }}
          onPressEnter={onOk}
          placeholder="输入文件名称"
          ref={input => {
            if (visible)
              modalInputRef.current = input
          }}
          value={inputName}
        />
      </Modal>

      <Button
        disabled={visible}
        onClick={() => {
          onOpenModal()
        }}
        type="primary"
      >
        add file
      </Button>

      <Button
        onClick={() => {
          clearFileList()
          onClearActiveId()
        }}
      >
        clear
      </Button>

      <Button
        onClick={undo}
      >
        undo
      </Button>

      <Button
        onClick={redo}
      >
        redo
      </Button>

      <Divider />

      <Row>
        <Col
          span={5}
        >
          <Menu
            className="file-list"
            defaultSelectedKeys={[activeId]}
            selectedKeys={[activeId]}
          >
            {
              fileList.map(fileItem => {
                const name = fileItem.get('name')
                const id = fileItem.get('id')

                return (
                  <Menu.Item
                    key={id}
                  >
                    <div
                      className="file-item"
                      data-id={id}
                      onClick={() => {
                        onSetActiveId(id)
                      }}
                    >
                      {name}
                    </div>
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
        <Col
          offset={1}
          span={18}
        >
          {
            activeId ? <BraftEditor
              onSave={value => {
                updateFileContent(activeId, value.toHTML())
              }}
              value={BraftEditor.createEditorState(files.getIn([activeId, 'content']))}
                       /> : <Empty />
          }

        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = ({ files }) => ({
  files: files.present
})

const mapDispatchToProps = dispatch => {
  return {
    updateFileContent (id, content) {
      dispatch(updateFileContent(id, content))
    },
    deleteFile (id) {
      dispatch(deleteFile(id))
    },
    clearFileList () {
      dispatch(clearFileList())
    },
    undo () {
      dispatch(filesUndo())
    },
    redo () {
      dispatch(filesRedo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(File)
