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
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            id
            fields {
              permalink
              tags
              category
            }
            frontmatter {
              date
              description
              tags
              category
              title
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
  const posts = get(result, 'data.allMarkdownRemark.nodes')
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 9,
    pathPrefix: '/posts',
    component: blogArchive,
  })

  posts.forEach((node, index) => {
    createPage({
      path: node.fields.permalink,
      component: blogPost,
      context: {
        id: node.id,
        permalink: node.fields.permalink,
        prevId: index === 0 ? null : posts[index - 1].id,
        nextId: index === posts.length - 1 ? null : posts[index + 1].id,
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
      category:String
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
