import {
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
  createFromIconfontCN,
} from '@ant-design/icons'

import { Avatar, Card, Col, Divider, Row, Tag } from 'antd'
import React, { Component } from 'react'
import { Link } from 'gatsby'
import { flattenDeep, groupBy } from 'lodash'
import classnames from 'classnames'
import { color } from '../common/js/config'
import { currentUserInfo } from './_mock'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2280915_2eibodcue0v.js',
})
class AccountCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {}
  renderUserInfo = currentUser => (
    <div className="detail">
      <p>
        <ContactsOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.title}
      </p>
      <p>
        <ClusterOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.group}
      </p>
      <p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {
          (
            currentUser.geographic || {
              province: {
                label: '',
              },
            }
          ).province.label
        }
        {
          (
            currentUser.geographic || {
              city: {
                label: '',
              },
            }
          ).city.label
        }
      </p>
    </div>
  )

  render() {
    const { currentUserLoading } = this.props
    const currentUser = currentUserInfo
    const dataLoading =
      currentUserLoading || !(currentUser && Object.keys(currentUser).length)
    const { tagList, categoryList } = this.props.data
    const tag = flattenDeep(tagList)
    const category = flattenDeep(categoryList)
    const tagGroup = groupBy(tag, val => val)
    const categoryGroup = groupBy(category, val => val)
    return (
      <Card
        bordered={false}
        style={{
          marginBottom: 24,
        }}
        loading={dataLoading}
      >
        {!dataLoading && (
          <div>
            <div className="avatarHolder">
              <img alt="" src={currentUser.avatar} />
              <div className="name">{currentUser.name}</div>
              <div>{currentUser.signature}</div>
            </div>
            {this.renderUserInfo(currentUser)}
            <Divider dashed />
            <div className="tags">
              <div className="tagsTitle">标签</div>
              {Object.keys(tagGroup).map(val => (
                <Tag
                  icon={<IconFont type={`icon-${val}`} />}
                  color={color[val] || '#1890ff'}
                  key={val}
                  className={classnames({ js: val === 'javascript' })}
                >
                  <Link to={`/tags/${val}`}>
                    {`${val}（${tagGroup[val].length}）`}
                  </Link>
                </Tag>
              ))}
            </div>
            <Divider style={{ marginTop: 16 }} dashed />
            <div className="team">
              <div className="teamTitle">分类</div>
              <Row gutter={36}>
                {Object.keys(categoryGroup).map(val => (
                  <Col key={val} lg={24} md={24} xl={14}>
                    <Link to={`/category/${val}`}>
                      <Avatar
                        size="small"
                        shape="square"
                        style={{ backgroundColor: color[val] }}
                        icon={<IconFont type={`icon-${val}`} />}
                      />
                      <span>{`${val}  （${categoryGroup[val].length}）`}</span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        )}
      </Card>
    )
  }
}

export default AccountCenter
