import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'
import { Card } from 'antd'
import Pagination from '../components/pagination'
import Layout from '../components/layout'
import Articles from '../components/post-item'

const BlogArchive = ({ data, pageContext, location }) => {
  const posts = get(data, 'allMarkdownRemark.nodes')
  const articles = posts.map(node => ({
    ...node.frontmatter,
    excerpt: node.excerpt,
    fields: node.fields,
  }))
  return (
    <Layout location={location}>
      <Card bordered={false}>
        <Articles list={articles} />
        <Pagination pageContext={pageContext} />
      </Card>
    </Layout>
  )
}

export default BlogArchive

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        excerpt
        fields {
          permalink
          tags
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
          title
          description
        }
      }
    }
  }
`
