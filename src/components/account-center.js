import { createFromIconfontCN } from '@ant-design/icons'

import { Avatar, Card, Col, Divider, Row, Tag } from 'antd'
import React, { Component } from 'react'
import { Link } from 'gatsby'
import { flattenDeep, groupBy } from 'lodash'
import classnames from 'classnames'
// import { color } from '../common/js/config'
const IconFont = createFromIconfontCN({
  scriptUrl: [
    // '//at.alicdn.com/t/font_2280915_2eibodcue0v.js',
    `//at.alicdn.com/t/font_2256009_9ss2x418ite.js`,
  ],
})
class AccountCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
  }
  componentDidMount() {}
  renderUserInfo = currentUser => (
    <div className="detail">
      <p>
        <IconFont
          type="icon-email"
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.email}
      </p>
      <p>
        <IconFont
          type="icon-signature"
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.summary}
      </p>
      <p>
        <IconFont
          type="icon-location"
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
    const { tagList, categoryList, siteMetadata } = this.props.data
    const currentUser = siteMetadata.author
    console.log(siteMetadata)
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
      >
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
                // icon={<IconFont type={`icon-${val}`} />}
                // color={color[val] || '#1890ff'}
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
                      // shape="square"
                      // style={{ backgroundColor: color[val] }}
                      // icon={<IconFont type={`icon-${val}`} />}
                      src={`https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png`}
                    />
                    <span>{`${val}  （${categoryGroup[val].length}）`}</span>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Card>
    )
  }
}

export default AccountCenter
