import React from 'react'

import { Layout } from '@/components'
import Error403 from '@/views/Admin/Error403'
import Error404 from '@/views/Admin/Error404'
import Home from '@/views/Admin/Home'
import Immutable from '@/views/Admin/Immutable'
import WebRTC from '@/views/WebRTC'
import Operation from '@/views/File'
import Upload from '@/views/File/Upload'
import Hooks from '@/views/Admin/Hooks'
import Sortable from '@/views/Admin/Sortable'
import Socket from '@/views/Admin/Socket'
import Poster from '@/views/Admin/Poster'

export default {
  path: '/admin',
  title: '控制台',
  component: Layout,
  redirect: '/admin/home',
  children: [
    {
      path: '/admin/home',
      title: 'Home',
      icon: 'icon-shouye',
      exact: true,
      component: Home
    },
    {
      path: '/admin/immutable',
      title: 'Immutable',
      icon: 'icon-liebiao',
      exact: true,
      component: Immutable,
      roles: ['super_administrator']
    },
    {
      path: '/admin/webrtc',
      title: 'WebRTC',
      icon: 'icon-xiangqing',
      exact: true,
      component: WebRTC
    },
    {
      path: '/admin/hooks',
      title: 'Hooks',
      icon: 'icon-shijian',
      exact: true,
      component: Hooks
    },
    {
      path: '/admin/sortable',
      title: 'Sortable',
      icon: 'icon-liebiao',
      exact: true,
      component: Sortable
    },
    {
      path: '/admin/socket',
      title: 'Socket',
      icon: 'icon-fabu',
      exact: true,
      component: Socket
    },
    {
      path: '/admin/poster',
      title: 'Poster',
      icon: 'icon-ad',
      exact: true,
      component: Poster
    },
    {
      path: '/admin/file',
      title: 'File',
      icon: 'icon-bianji',
      roles: ['super_administrator', 'administrator'],
      children: [
        {
          path: '/admin/file/operation',
          title: 'Operation',
          exact: true,
          component: Operation,
          roles: ['super_administrator', 'administrator']
        },
        {
          path: '/admin/file/upload',
          title: 'Upload',
          exact: true,
          component: Upload,
          roles: ['super_administrator']
        }
      ]
    },
    {
      path: '/admin/error403',
      title: 'error403',
      exact: true,
      component: Error403,
      notInMenu: true
    },
    {
      path: '/admin/error404',
      title: 'error404',
      exact: true,
      component: Error404,
      notInMenu: true
    }
  ]
}
