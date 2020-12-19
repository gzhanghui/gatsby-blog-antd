import React from 'react'
import { Link } from 'gatsby'
import { List, Tag } from 'antd'
import {
  LikeTwoTone,
  MessageOutlined,
  ClockCircleFilled,
} from '@ant-design/icons'
const Articles = props => {
  const { list } = props
  const IconText = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  )
  const title = item =>
    item.title ||
    item.fields.permalink.split('/')[
      item.fields.permalink.split('/').length - 2
    ]
  return (
    <List
      size="large"
      className="articleList"
      rowKey="title"
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              key="like"
              icon={<LikeTwoTone />}
              text={item.like || 0}
            />,
            <IconText
              key="message"
              icon={<MessageOutlined />}
              text={item.message || 0}
            />,
            <IconText
              key="update"
              icon={<ClockCircleFilled />}
              text={item.date || 0}
            />,
          ]}
        >
          <List.Item.Meta
            title={
              <Link className="listItemMetaTitle" to={item.fields.permalink}>
                <span className="article-list-title">{title(item)} </span>
              </Link>
            }
            description={
              <div>
                {item.fields.tags?.map(tag => (
                  <Link to={`/tags/${tag}`} key={tag}>
                    <Tag>{tag}</Tag>
                  </Link>
                ))}
              </div>
            }
          />
          <div className="listContent">
            <p
              className="description"
              dangerouslySetInnerHTML={{
                __html: item.description || item.excerpt,
              }}
            />
          </div>
        </List.Item>
      )}
    />
  )
}

export default Articles
