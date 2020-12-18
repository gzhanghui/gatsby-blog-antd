import axios from 'axios'
import {
  HomeOutlined,
  ContactsOutlined,
  ClusterOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Col, Divider, Row, Tag, message, Typography } from 'antd'
import React, { Component } from 'react'
import { Link } from 'gatsby'
import { flattenDeep, groupBy } from 'lodash'
import { currentUserInfo } from './_mock'
const { Paragraph } = Typography
const TagList = ({ tags }) => {
  return (
    <div className="tags">
      <div className="tagsTitle">标签</div>
      {(tags || []).map(item => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
    </div>
  )
}

class AccountCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
    }
  }
  componentDidMount() {
    // this.getComments()
  }
  async getComments() {
    try {
      const res = await axios.get(
        'https://api.uomg.com/api/comments.163?format=json'
      )
      if (res.data.code === 1) {
        this.setState({
          comments: res.data.data,
        })
      } else {
        message.error(res.data.msg)
      }
    } catch (error) {
      message.error('网络错误！')
    }
  }
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
    const arr = flattenDeep(this.props.data.tagList)
    const tagGroup = groupBy(arr, val => val.fileName.replace(/.svg/, ''))
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
            <TagList tags={currentUser.tags || []} />
            <Divider style={{ marginTop: 16 }} dashed />

            <div className="team">
              <div className="teamTitle">标签</div>
              <Row gutter={36}>
                {Object.keys(tagGroup).map(val => (
                  <Col key={val} lg={24} xl={12}>
                    <Link to={`/tags/${val}`}>
                      {tagGroup[val][0].path ? (
                        <Avatar
                          size="small"
                          src={`data:image/svg+xml;base64,${tagGroup[val][0].path}`}
                        />
                      ) : (
                        ''
                      )}
                      {`${val}  （${tagGroup[val].length}）`}
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
            <Divider style={{ marginTop: 16 }} dashed />
            <div className="comments">
              <Paragraph copyable={{ tooltips: false }}>
                {this.state.comments.content}
              </Paragraph>
            </div>
          </div>
        )}
      </Card>
    )
  }
}

export default AccountCenter
