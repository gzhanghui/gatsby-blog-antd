import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { isEmpty, isEqual } from 'lodash'
import { message, Menu } from 'antd'
import Storage from 'good-storage'
import { SettingOutlined, CheckOutlined } from '@ant-design/icons'
import darkVars from '../theme/dark.json'
import lightVars from '../theme/light.json'
import { colorPalette } from '../common/js/config'

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
    setMode(themeMode)
    setColor(themeColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    changeTheme(storage, mode, color)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, color])

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
    </Menu>
  )
}
export default React.memo(ModeIcon, (prevProps, nextProps) =>
  isEqual(prevProps.onThemeChange, nextProps.onThemeChange)
)
