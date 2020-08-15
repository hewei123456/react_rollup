import io from 'socket.io-client'
import React, { useState, useEffect } from 'react'
import { Input, Button, Row, Col, message } from 'antd'
import { useDynamicList, useBoolean } from 'ahooks'

import { connect } from 'react-redux'

import './index.less'

const socketUrl = 'ws://47.94.214.83'

const Socket = ({ username }) => {
  const { list: queue, resetList: setQueue, push } = useDynamicList([])
  const [usersNum, setUsersNum] = useState(0)
  const [content, setContent] = useState('')
  const [room, setRoom] = useState('')
  const [disabled, { setTrue }] = useBoolean(false)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (socket) {
      socket.emit('join', room, username)

      socket.on('joined', (username) => {
        message.info(`用户 ${username} 加入房间`, 1.5)
      })

      socket.on('update user number', (num, username) => {
        setUsersNum(num)
        if (username)
          message.warning(`用户 ${username} 离开房间`, 1.5)
      })

      socket.on('message', (username, content) => {
        push({
          username,
          content
        })
      })

      socket.on('connect_error', data => {
        console.log(data)
        message.warning('网络连接问题，长连接断开', 2)
      })

      return () => {
        socket.close()
      }
    }
  }, [socket])

  return (
    <div id="socket">
      <Row
        align="middle"
        className="row"
        gutter={16}
      >
        <Col
          className="gutter-row"
          span={3}
        >
          Room:
        </Col>
        <Col
          className="gutter-row"
          span={6}
        >
          <Input
            disabled={disabled}
            onChange={e => {
              e.persist()
              setRoom(e.target.value)
            }}
            value={room}
          />
        </Col>
        <Col
          className="gutter-row"
          span={6}
        >
          <Button
            disabled={room.length === 0 || username.length === 0}
            onClick={() => {
              setSocket(io.connect(socketUrl))
              setTrue()
            }}
            type="primary"
          >connect</Button>
        </Col>
      </Row>
      <Row
        align="middle"
        className="row"
        gutter={16}
      >
        <Col
          className="gutter-row"
          span={3}
        >
          Number:
        </Col>
        <Col
          className="gutter-row"
          span={6}
        >
          {usersNum}
        </Col>
      </Row>

      <Row
        align="middle"
        className="row"
        gutter={16}
      >
        <Col
          className="gutter-row"
          span={12}
        >
          <Input
            onChange={e => {
              e.persist()
              setContent(e.target.value)
            }}
            onPressEnter={() => {
              socket.emit('message', room, username, content)
              push({
                username,
                content,
                mine: true
              })
              setContent('')
            }}
            value={content}
          />
        </Col>
      </Row>

      {
        queue.map((item, index) => {
          return (
            <p
              key={index}
              style={
                {
                  width: 600,
                  margin: 15,
                  textAlign: item.mine ? 'right' : 'left'
                }
              }
            >
              <span>{item.username}: </span>
              {item.content}
            </p>
          )
        })
      }
    </div>
  )
}

export default connect(({ user }) => ({
  username: user.get('username')
}))(Socket)
