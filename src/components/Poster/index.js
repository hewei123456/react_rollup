import React, { useEffect, useState } from 'react'
import { Button, Spin } from 'antd'
import cx from '@sayll/canvas_x'

import './index.less'

const Poster = ({ poster, qrcode, boxX, boxY, faWidth, faHeight, boxWidth, boxHeight, onSubmit }) => {

  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    // box是装图片的容器, fa是图片移动缩放的范围, scale是控制缩放的小图标
    var box = document.getElementById('box')
    var fa = document.getElementById('father')
    var scale = document.getElementById('scale')

    box.style.width = boxWidth + 'px'
    box.style.height = boxHeight + 'px'
    box.style.left = boxX + 'px'
    box.style.top = boxY + 'px'

    // 图片移动效果
    box.onmousedown = function (ev) {
      var oEvent = ev
      // 浏览器有一些图片的默认事件,这里要阻止
      oEvent.preventDefault()
      var disX = oEvent.clientX - box.offsetLeft
      var disY = oEvent.clientY - box.offsetTop
      fa.onmousemove = function (ev) {
        oEvent = ev
        oEvent.preventDefault()
        var x = oEvent.clientX - disX
        var y = oEvent.clientY - disY

        // 图形移动的边界判断
        x = x <= 0 ? 0 : x
        x = x >= fa.offsetWidth - box.offsetWidth ? fa.offsetWidth - box.offsetWidth : x
        y = y <= 0 ? 0 : y
        y = y >= fa.offsetHeight - box.offsetHeight ? fa.offsetHeight - box.offsetHeight : y
        box.style.left = x + 'px'
        box.style.top = y + 'px'

        boxX = x
        boxY = y
      }
      // 图形移出父盒子取消移动事件,防止移动过快触发鼠标移出事件,导致鼠标弹起事件失效
      fa.onmouseleave = function () {
        fa.onmousemove = null
        fa.onmouseup = null
      }
      // 鼠标弹起后停止移动
      fa.onmouseup = function () {
        fa.onmousemove = null
        fa.onmouseup = null
      }
    }
    // 图片缩放效果
    scale.onmousedown = function (e) {
      // 阻止冒泡,避免缩放时触发移动事件
      e.stopPropagation()
      e.preventDefault()
      var pos = {
        'w': box.offsetWidth,
        'h': box.offsetHeight,
        'x': e.clientX,
        'y': e.clientY
      }
      fa.onmousemove = function (ev) {
        ev.preventDefault()
        // 设置图片的最小缩放为100*100
        var w = Math.max(100, ev.clientX - pos.x + pos.w)
        var h = Math.max(100, ev.clientY - pos.y + pos.h)

        // 设置图片的最大宽高
        w = w >= fa.offsetWidth - box.offsetLeft ? fa.offsetWidth - box.offsetLeft : w
        h = h >= fa.offsetHeight - box.offsetTop ? fa.offsetHeight - box.offsetTop : h
        w = h = w > h ? h : w

        box.style.width = w + 'px'
        box.style.height = h + 'px'

        boxWidth = w
        boxHeight = h
      }
      fa.onmouseleave = function () {
        fa.onmousemove = null
        fa.onmouseup = null
      }
      fa.onmouseup = function () {
        fa.onmousemove = null
        fa.onmouseup = null
      }
    }
  }, [poster, qrcode, boxX, boxY, faWidth, faHeight, boxWidth, boxHeight])

  return (
    <Spin spinning={spinning}>
      <Button
        type="primary"
        onClick={() => {
          setSpinning(true)
          cx.makeImage({
            type: 'url',
            compress: 1,
            parts: [
              {
                type: 'image',
                url: poster,
                width: faWidth,
                height: faHeight
              },
              {
                type: 'image',
                url: qrcode,
                width: boxWidth,
                height: boxHeight,
                background: '#fff',
                x: boxX,
                y: boxY,
                editable: true,
                clipOptions: {
                  zoom: true,
                  align: 'center'
                }
              }
            ],
            width: faWidth,
            height: faHeight
          }, (err, base64) => {
            setSpinning(false)
            onSubmit({
              faWidth,
              faHeight,
              boxWidth,
              boxHeight,
              boxX,
              boxY,
              base64
            })
          })
        }}
      >create</Button>
      <div
        id="father"
        style={
          { width: faWidth, height: faHeight, marginTop: 20 }
        }
      >
        <img
          src={poster}
          id="poster"
          alt="海报"
        />

        <div id="box">
          <img
            src={qrcode}
            alt="二维码"
          />
          <div id="scale" />
        </div>
      </div>
    </Spin>
  )
}

Poster.defaultProps = {
  poster: 'http://kaoyan-project.oss-cn-zhangjiakou.aliyuncs.com/police/1589193058848.png',
  qrcode: 'http://kydb.oss-cn-zhangjiakou.aliyuncs.com/1597133960912.jpg',
  boxX: 0,
  boxY: 0,
  faWidth: 939,
  faHeight: 531,
  boxWidth: 100,
  boxHeight: 100
}

export default Poster
