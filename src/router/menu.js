import React from 'react'

import { Layout } from '@/components'
import File from '@/views/File'
import WebRTC from '@/views/WebRTC'

export default {
  path: '/admin',
  title: '控制台',
  component: Layout,
  redirect: '/admin/file',
  children: [
    {
      path: '/admin/file',
      title: 'Home',
      icon: 'icon-shouye',
      exact: true,
      component: File
    },
    {
      path: '/admin/webrtc',
      title: 'WebRTC',
      icon: 'icon-xiangqing',
      exact: true,
      component: WebRTC
    }
  ]
}
