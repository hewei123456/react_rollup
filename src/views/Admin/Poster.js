import React, { useState } from 'react'
import PosterComponent from '@/components/Poster'

const Poster = () => {
  const [image, setImage] = useState('')
  const [posterProps, setPosterProps] = useState({
    poster: 'http://kaoyan-project.oss-cn-zhangjiakou.aliyuncs.com/police/1589193058848.png',
    qrcode: 'http://kydb.oss-cn-zhangjiakou.aliyuncs.com/1597133960912.jpg',
    boxX: 0,
    boxY: 0,
    faWidth: 939,
    faHeight: 531,
    boxWidth: 100,
    boxHeight: 100
  })

  return (
    <>
      <PosterComponent
        {...posterProps}
        onSubmit={({ base64, ...posterProps }) => {
          setImage(base64)
          setPosterProps(posterProps)
        }}
      />
      {
        image ?
          <img
            src={image}
            alt="海报"
          /> : null
      }
    </>
  )
}

export default Poster
