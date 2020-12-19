import React, { useState, Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import { Card, Col, Row, Button } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Articles from '../components/post-item'
import AccountCenter from '../components/account-center'
import '../common/less/common.less'
import '../styles/index.less'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tags = JSON.parse(data.site.siteMetadata.tagList)
  let posts = data.allMarkdownRemark.nodes
  posts = posts.slice(0, 10)
  const articles = posts.map(item => ({
    ...item.frontmatter,
    excerpt: item.excerpt,
    fields: item.fields,
  }))
  const tagList = articles
    .filter(item => !!item.fields.tags)
    .map(item => {
      const tag = item.fields.tags
      const arr = []
      tag.forEach(t => {
        const res = tags.find(n => n.fileName === `${t}.svg`)
        if (res) {
          arr.push(res)
        } else {
          arr.push(t)
        }
      })
      return arr
    })

  const [tabKey, setTabKey] = useState('articles')
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
            <AccountCenter data={{ current: {}, tagList: tagList }} />
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
        tagList
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt
        fields {
          permalink
          tags
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
