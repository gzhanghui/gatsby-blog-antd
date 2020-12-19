import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Card, Col, Row } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import { get } from 'lodash'
import Articles from '../components/post-item'
import PostTag from '../components/post-tag'
const CategoryTemplate = ({ location, pageContext, data }) => {
  const { tag } = pageContext
  const posts = get(data, 'allMarkdownRemark.nodes')
  const articles = posts.map(node => ({
    ...node.frontmatter,
    excerpt: node.excerpt,
    fields: node.fields,
  }))
  return (
    <Layout location={location}>
      <SEO title={`Posts in tag "${tag}"`} />
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card className="tabsCard" bordered={false}>
              <div>
                <i className="glyphicon glyphicon-send"></i>
                {tag}
              </div>
              <PostTag />
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card className="tabsCard" bordered={false}>
              <Articles list={articles} />
            </Card>
          </Col>
        </Row>
      </GridContent>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        fields {
          permalink
          tags
        }
        excerpt
        timeToRead
        frontmatter {
          title
          date
        }
      }
    }
  }
`

export default CategoryTemplate
