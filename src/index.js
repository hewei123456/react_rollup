import React from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'

import { useActiveId, useContextMenu, useIpcRenderer, useModal, useSelectFiles } from '@/hooks'
import { Col, Empty, Input, Menu, Modal, Row } from 'antd'
import { clearFileList, filesRedo, filesUndo, updateFileContent } from '@/store/files'

import { Scrollbars } from 'react-custom-scrollbars'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import './style/index.less'
import './index.less'


const mapStateToProps = ({ files }) => ({
  files: files.present
})

const mapDispatchToProps = dispatch => {
  return {
    updateFileContent (id, content) {
      dispatch(updateFileContent(id, content))
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

const Index = connect(mapStateToProps, mapDispatchToProps)(
  ({ undo, redo, updateFileContent, clearFileList, files }) => {
    const [...fileList] = files.values()

    /* -------hooks------- */
    const [visible, openId, modalInputRef, inputName, setInputName, onOk, onCancel, onOpenModal] = useModal()
    const [activeId, onSetActiveId, onDelete] = useActiveId()
    const [selectDisabled, selectFiles] = useSelectFiles()

    useIpcRenderer({
      'undo': undo,
      'redo': redo,
      'add-file': () => {
        onOpenModal()
      },
      'select-files': selectFiles,
      'clear-files': () => {
        clearFileList()
      }
    })

    const onCurrentClick = useContextMenu([
      {
        label: 'delete',
        click: () => {
          onCurrentClick(({ id }) => {
            onDelete(id)
          })
        }
      },
      {
        label: 'rename',
        click: () => {
          onCurrentClick(({ id }) => {
            onOpenModal(id)
          })
        }
      }
    ], 'file-list', 'file-item', [files, activeId])

    return (
      <div id="root">
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
            ref={modalInputRef}
            value={inputName}
          />
        </Modal>

        <Scrollbars hideTracksWhenNotNeeded>
          <div className="root-container">
            <Scrollbars hideTracksWhenNotNeeded>
              <div id="file">
                <Row>
                  <Col
                    span={files.size === 0 ? 0 : 5}
                  >
                    <Menu
                      mode="inline"
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
                    offset={files.size === 0 ? 0 : 1}
                    span={files.size === 0 ? 24 : 18}
                  >
                    {
                      (() => {
                        switch (files.getIn([activeId, 'type'])) {
                          case '.docx':
                            return (
                              <BraftEditor
                                onSave={value => {
                                  updateFileContent(activeId, value.toHTML())
                                }}
                                value={BraftEditor.createEditorState(files.getIn([activeId, 'content']))}
                              />
                            )
                          default:
                            return (
                              <Empty
                                style={
                                  {
                                    marginTop: 30
                                  }
                                }
                              />
                            )
                        }
                      })()
                    }
                  </Col>
                </Row>
              </div>
            </Scrollbars>
          </div>
        </Scrollbars>
      </div>
    )
  }
)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <Index />
    </PersistGate>
  </Provider>, document.getElementById('root')
)
