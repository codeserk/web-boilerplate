import { UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import { UserDtoRoleEnum } from 'frontend/client'
import { AuthStoreContext } from 'frontend/modules/auth/auth.store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import styled from 'styled-components'

const { Header, Content, Footer } = Layout

const PATH_TITLE: Record<string, string> = {
  '/': 'Diary',
  '/admin/report': 'Report',
  '/admin/entries': 'Entries',
}

export function AppLayout(props) {
  const router = useRouter()

  const { isAuthenticated, logout, user } = useContext(AuthStoreContext)

  const profileMenu = (
    <Menu>
      <Menu.Item onClick={logout} key="logout">
        Logout
      </Menu.Item>
    </Menu>
  )

  if (!isAuthenticated) {
    return (
      <Container className="guest">
        <div className="content-centered">{props.children}</div>
      </Container>
    )
  }

  return (
    <Container className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[router.asPath]}>
          <Menu.Item key="/">
            <Link href="/">Diary</Link>
          </Menu.Item>

          {user?.role === UserDtoRoleEnum.Admin && (
            <Menu.Item key="/admin/report">
              <Link href="/admin/report">Report</Link>
            </Menu.Item>
          )}
          {user?.role === UserDtoRoleEnum.Admin && (
            <Menu.Item key="/admin/entries">
              <Link href="/admin/entries">Entries</Link>
            </Menu.Item>
          )}

          <Dropdown className="profile-dropdown" overlay={profileMenu}>
            <a>
              <UserOutlined />
              <span> {user?.username}</span>
            </a>
          </Dropdown>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>{PATH_TITLE[router.asPath]}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Codeserk Web Boilerplate ©2021</Footer>
    </Container>
  )
}

// Styles

const Container = styled(Layout)`
  &.guest {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .site-layout-content {
    min-height: calc(100vh - 188px);
    padding: 24px;
    background: #fff;
  }
  .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }
  .ant-row-rtl .logo {
    float: right;
    margin: 16px 0 16px 24px;
  }

  .profile-dropdown {
    float: right;
  }
`
