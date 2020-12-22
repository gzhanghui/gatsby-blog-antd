import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { isEmpty, isEqual } from 'lodash'
import { message, Menu } from 'antd'
import Storage from 'good-storage'
import darkVars from '../theme/dark.json'
import lightVars from '../theme/light.json'
import {
  SettingOutlined,
  CheckOutlined,
  GithubOutlined,
} from '@ant-design/icons'

const colorPalette = [
  { label: '薄暮', value: '#f5222d', name: 'Dust Red' },
  { label: '火山', value: '#fa541c', name: 'Volcano' },
  { label: '日暮', value: '#fa8c16', name: 'Sunset Orange' },
  { label: '极光绿', value: '#52c41a', name: 'Polar Green' },
  { label: '明青', value: '#13c2c2', name: 'Cyan' },
  { label: '拂晓蓝', value: '#1890ff', name: 'Daybreak Blue' },
  { label: '极客蓝', value: '#2f54eb', name: 'Geek Blue' },
  { label: '酱紫', value: '#722ed1', name: 'Golden Purple' },
]
const changeTheme = (storage, mode, color, callback) => {
  const vars = mode === 'light' ? lightVars : darkVars
  const theme = { ...vars, ...color }
  if (typeof window !== `undefined`) {
    window.less
      .modifyVars(theme)
      .then(() => {
        storage.set('theme-mode', mode)
        storage.set('theme-color', color)
        callback && callback(mode)
      })
      .catch(error => {
        message.error('主题切换失败失败')
      })
  }
}
const ModeIcon = props => {
  const [storage, setStorage] = useState(Storage)
  const [mode, setMode] = useState('light')
  const [color, setColor] = useState({
    '@primary-color': colorPalette[5].value,
  })
  useEffect(() => {
    setStorage(Storage)
    const themeMode = storage.get('theme-mode') || mode
    const themeColor = isEmpty(storage.get('theme-color'))
      ? color
      : storage.get('theme-color')
    console.log(themeMode, themeColor)
    setMode(themeMode)
    setColor(themeColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    changeTheme(storage, mode, color)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Menu
      mode="horizontal"
      onSelect={({ key }) => {
        const index = colorPalette.findIndex(item => key === item.value)
        if (index > -1) {
          setColor({ '@primary-color': key })
          changeTheme(storage, mode, { '@primary-color': key })
        }
      }}
    >
      <Menu.Item key="mail">
        <button
          className={classnames('theme-mode-button', {
            'dark-mode': mode === 'light',
            'light-mode': mode === 'dark',
          })}
          onClick={() => {
            const currentMode = mode === 'light' ? 'dark' : 'light'
            setMode(currentMode)
            changeTheme(storage, currentMode, {}, mode => {
              props.onThemeChange(mode)
            })
          }}
        >
          <div className="icon1"></div>
          <div className="icon2"></div>
        </button>
      </Menu.Item>
      <Menu.SubMenu key="SubMenu" icon={<SettingOutlined />}>
        {colorPalette.map(item => (
          <Menu.Item key={item.value}>
            <div className="color-icon" style={{ backgroundColor: item.value }}>
              {item.value === color['@primary-color'] && <CheckOutlined />}
            </div>
            <span>{item.label}</span>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
      <Menu.Item>
        <GithubOutlined />
      </Menu.Item>
    </Menu>
  )
}
export default React.memo(ModeIcon, (prevProps, nextProps) =>
  isEqual(prevProps.onThemeChange, nextProps.onThemeChange)
)
