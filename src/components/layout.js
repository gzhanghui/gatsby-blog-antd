import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { BackTop } from 'antd'
import Storage from 'good-storage'
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout'
import {
  GithubOutlined,
  ZhihuOutlined,
  WeiboOutlined,
  TwitterOutlined,
  YuqueFilled,
  VerticalAlignTopOutlined,
} from '@ant-design/icons'
import ModeIcon from './mode-icon'

const Layout = ({ title, children }, props) => {
  const [storage, setStorage] = useState(Storage)
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    setStorage(Storage)
    setTheme(storage.get('theme-mode') || theme)
  }, [])
  return (
    <ProLayout
      title={title}
      headerHeight={60}
      onMenuHeaderClick={() => {
        navigate('/')
      }}
      layout={'top'}
      navTheme={theme}
      headerTheme={theme}
      fixedHeader={true}
      rightContentRender={() => (
        <div className="header-right">
          <ModeIcon
            onThemeChange={theme => {
              setTheme(theme)
            }}
          />
        </div>
      )}
      siderWidth={300}
      footerRender={() => (
        <DefaultFooter
          links={[
            {
              key: 'ZhihuOutlined',
              title: <ZhihuOutlined />,
              href: 'www.alipay.com',
            },
            {
              key: 'GithubOutlined',
              title: <GithubOutlined />,
              href: 'www.alipay.com',
            },
            {
              key: 'WeiboOutlined',
              title: <WeiboOutlined />,
              href: 'www.alipay.com',
            },
            {
              key: 'YuqueFilled',
              title: <YuqueFilled />,
              href: 'www.alipay.com',
            },
            {
              key: 'TwitterOutlined',
              title: <TwitterOutlined />,
              href: 'www.alipay.com',
            },
          ]}
          copyright="powered by Gatsbyjs"
        />
      )}
    >
      <React.Fragment>{children}</React.Fragment>
      <BackTop style={{ right: '34px' }}>
        <div className="back-top">
          <VerticalAlignTopOutlined />
        </div>
      </BackTop>
    </ProLayout>
  )
}

export default Layout
