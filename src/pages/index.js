import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios'
import { graphql, Link } from 'gatsby'
import { isEmpty } from 'lodash'
import { Card, Col, Row, Button, message } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Articles from '../components/post-item'
import AccountCenter from '../components/account-center'
import Player from '../components/player'
import '../common/less/common.less'
import '../styles/index.less'

const BlogIndex = ({ data, location }) => {
  const { siteMetadata } = data.site
  const siteTitle = siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const articles = posts.slice(0, 10).map(item => ({
    ...item.frontmatter,
    excerpt: item.excerpt,
    fields: item.fields,
  }))
  const tagList = posts
    .filter(item => !!item.fields.tags)
    .map(item => item.fields.tags)
  const categoryList = posts
    .filter(item => !!item.fields.category)
    .map(item => item.fields.category)
  const [tabKey, setTabKey] = useState('articles')
  const [comments, setComments] = useState({})
  useEffect(() => {
    if (isEmpty(comments)) {
      getComments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function getComments() {
    try {
      const res = await axios.get(
        'https://api.uomg.com/api/comments.163?format=json'
      )
      if (res.data.code === 1) {
        setComments(res.data.data)
      } else {
        message.error(res.data.msg)
      }
    } catch (error) {
      message.error('网络错误！')
    }
  }

  const operationTabList = articleTotal => {
    return [
      {
        key: 'articles',
        tab: (
          <span className="tab-list-item">
            文章<em>({articleTotal})</em>
          </span>
        ),
      },
      {
        key: 'applications',
        tab: (
          <span className="tab-list-item">
            应用<em>(8)</em>{' '}
          </span>
        ),
      },
      {
        key: 'projects',
        tab: (
          <span className="tab-list-item">
            项目<em>(8)</em>
          </span>
        ),
      },
    ]
  }
  const renderChildrenByTabKey = tabKey => {
    if (tabKey === 'projects') {
      return <div>projects</div>
    }

    if (tabKey === 'applications') {
      return <div>aaa</div>
    }

    if (tabKey === 'articles') {
      return (
        <Fragment>
          <Articles list={articles} />
          <GridContent>
            <Row gutter={24}>
              <Col
                lg={24}
                md={24}
                style={{ width: '100%', padding: '0 24px', margin: '24px 0' }}
              >
                <Button type="dashed" block>
                  <Link to="/posts">查看所有文章</Link>
                </Button>
              </Col>
            </Row>
          </GridContent>
        </Fragment>
      )
    }
    return null
  }

  const { nodes } = data.allMarkdownRemark
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <AccountCenter data={{ siteMetadata, tagList, categoryList }} />
            <Player
              comments={comments}
              onRefresh={() => {
                getComments()
              }}
            />
          </Col>
          <Col lg={17} md={24}>
            <Card
              className="tabsCard"
              bordered={false}
              tabList={operationTabList(nodes.length)}
              activeTabKey={tabKey}
              onTabChange={key => {
                setTabKey(key)
              }}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </GridContent>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
          summary
          country
          signature
          avatar
          address
          email
          geographic {
            province {
              label
            }
            city {
              label
            }
          }
        }
        description
        siteUrl
        social {
          twitter
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt
        fields {
          permalink
          tags
          category
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
