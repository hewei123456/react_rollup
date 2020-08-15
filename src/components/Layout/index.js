import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Icon, Header } from '@/components'
import { menu } from '@/router'

import './index.less'

@withRouter
@connect(({ user }) => ({
  roles: user.get('roles')
}))
class AdminLayout extends PureComponent {
  state = {
    showLeft: true
  }

  toggleShowLeft = () => {
    this.setState(state => ({
      showLeft: !state.showLeft
    }))
  }

  checkAuthorized = (routerRoles) => {
    const { roles } = this.props
    return routerRoles == null || roles.filter(role => routerRoles.indexOf(role) > -1).length > 0
  }

  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      // 如果当前路由通过授权
      if (!item.notInMenu && this.checkAuthorized(item.roles)) {

        // 如果当前路由有子路由
        if (item.children && item.children.length > 0) {
          // 当前路由子路由通过授权数量
          const children = item.children.filter(child => this.checkAuthorized(child.roles))

          // 如果当前路由子路由通过授权数量大于0
          return children.length > 0 ? (
            <Menu.SubMenu
              key={item.path}
              title={
                <span>
                {item.icon ? <Icon type={item.icon} /> : null}
                  <span>{item.title}</span>
              </span>
              }
            >
              {this.renderMenu(children)}
            </Menu.SubMenu>
          ) : null
        }

        return (
          <Menu.Item
            key={item.path}
            title={item.title}
          >
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.title}</span>
          </Menu.Item>
        )
      } else
        return null
    })
  }

  render () {
    const { showLeft } = this.state
    const { history, children } = this.props
    const { pathname } = history.location
    const menus = menu.children
    const defaultOpenKeys = menus.filter(item => item.children).map(item => item.path)

    return (
      <>
        <Header />
        <div className="aside-view">
          {
            <aside className={`aside ${showLeft ? '' : 'hide-aside'}`}>
              <Scrollbars>
                <div>
                  <Menu
                    defaultOpenKeys={defaultOpenKeys}
                    inlineCollapsed={!showLeft}
                    mode="inline"
                    onClick={({ key }) => {
                      if (key === pathname)
                        return false
                      history.push(key)
                    }}
                    selectedKeys={[pathname]}
                  >
                    {
                      this.renderMenu(menus)
                    }
                  </Menu>
                </div>
              </Scrollbars>

              <div
                className="toggle"
                onClick={this.toggleShowLeft}
              >
                {
                  showLeft ? <CaretLeftOutlined /> : <CaretRightOutlined />
                }
              </div>
            </aside>
          }

          <section className="view">
            <div className="view-scroll-wrapper">
              <Scrollbars>
                <div className="view-content">
                  {children}
                </div>
              </Scrollbars>
            </div>
          </section>
        </div>
      </>
    )
  }
}

export default AdminLayout
