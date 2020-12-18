const path = require(`path`)
const { get } = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require('gatsby-awesome-pagination')
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const blogArchive = path.resolve('src/templates/blog-archive.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
          edges {
            node {
              fields {
                permalink
                tags
              }
              frontmatter {
                date
                description
                tags
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    console.log(result.errors)
    return
  }
  const posts = get(result, 'data.allMarkdownRemark.edges')
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 9,
    pathPrefix: '/posts',
    component: blogArchive,
  })
  posts.forEach((post, index) => {
    createPage({
      path: post.node.fields.permalink,
      component: blogPost,
      context: {
        permalink: post.node.fields.permalink,
        prev: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `permalink`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      tagList: String
    }

    type Author {
      name: String
      summary: String
    }
    type Social {
      twitter: String
    }
   
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      permalink: String
    }
  `)
}

exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  if (stage.startsWith('develop')) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    })
  }
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /(good-storage|smooth-scroll)/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
