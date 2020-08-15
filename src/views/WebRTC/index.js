import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'

const WebRTC = () => {
  const videoRef = useRef(null)
  const [videoTrack, setVideoTrack] = useState(null)

  const handleMediaStream = async (stream) => {
    setVideoTrack(stream.getVideoTracks()[0])

    window.stream = stream
    videoRef.current.srcObject = stream

    return navigator.mediaDevices.enumerateDevices()
  }

  const onExit = () => {
    videoTrack.stop()
    videoRef.current.srcObject = null
    setVideoTrack(null)
  }

  const onStart = () => {
    if (!navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia) {

      console.log('getUserMedia is not supported!')
    } else {

      var constraints = {
        video: {
          width: 640,
          height: 480,
          frameRate: 15,
          facingMode: 'enviroment'
        },
        audio: false
      }

      navigator.mediaDevices.getUserMedia(constraints)
        .then(handleMediaStream)
        .then(deviceInfos => {
          console.log(deviceInfos)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (videoTrack) {
      const videoConstraints = videoTrack.getSettings()
      console.log(videoConstraints)
    }

    return () => {
      if (videoTrack) {
        onExit()
      }
    }
  }, [videoTrack])

  return (
    <div>
      <h1>
        <a
          href="//webrtc.github.io/samples/"
          title="WebRTC samples homepage"
        >
          WebRTC samples
        </a>
        <span>Select sources &amp; outputs</span>
      </h1>

      <video
        autoPlay
        id="videoplayer"
        playsInline
        ref={videoRef}
      />
      {
        videoTrack ? <Button onClick={onExit}>exit</Button> : <Button onClick={onStart}>start</Button>
      }
    </div>
  )
}

export default WebRTC
