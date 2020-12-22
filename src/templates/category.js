import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
// import PostsList from '../components/post-item'

const CategoryTemplate = ({ location, pageContext, data }) => {
  //   const { category } = pageContext
  console.log(data)
  return (
    <Layout>
      <SEO title={`Posts in tag `} />
      <div className="category-container"></div>
    </Layout>
  )
}
export default CategoryTemplate
export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            permalink
            category
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
  }
`
