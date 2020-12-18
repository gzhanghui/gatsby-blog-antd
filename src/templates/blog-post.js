import React, { useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import { Row } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import SmoothScroll from 'smooth-scroll'
import classnames from 'classnames'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { prev, next } = pageContext
  const [scroll, setScroll] = useState(null)
  console.log(scroll)
  useEffect(async () => {
    setScroll(new SmoothScroll('a[href*="#"]'))
  }, [])
  return (
    <Layout location={location}>
      <div
        className={classnames('post-main', {
          space0: location.pathname.startsWith(`/articles/`),
        })}
      >
        <div className="container">
          <div className="row ">
            <div className="col-md-9">
              <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
              />
              <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h1 itemProp="headline">{post.frontmatter.title}</h1>
                  <p>{post.frontmatter.date}</p>
                </header>
                <section
                  dangerouslySetInnerHTML={{ __html: post.html }}
                  itemProp="articleBody"
                />
                <hr />
                <footer>
                  <Bio />
                </footer>
              </article>
              <nav className="blog-post-nav">
                <ul
                  style={{
                    display: `flex`,
                    flexWrap: `wrap`,
                    justifyContent: `space-between`,
                    listStyle: `none`,
                    padding: 0,
                  }}
                >
                  <li>
                    {prev && (
                      <Link to={prev.fields.permalink} rel="prev">
                        ← {prev.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link to={next.fields.permalink} rel="next">
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-3">
              <div
                className="docs-sidebar hidden-print hidden-xs hidden-sm affix"
                dangerouslySetInnerHTML={{
                  __html: post.tableOfContents,
                }}
              ></div>
              <div
                dangerouslySetInnerHTML={{
                  __html: handleAnchor(post.tableOfContents),
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <GridContent>
        <Row className="post-container">
          <div className="antd-pro-pages-account-settings-style-main">
            <div className="antd-pro-pages-account-settings-style-right"></div>
          </div>
        </Row>
      </GridContent>
    </Layout>
  )
}

function handleAnchor(str) {
  // const fragment = document.createElement('div')
  // fragment.innerHTML = str
  // const href = [].map.call(fragment.querySelectorAll('a'), a => a.href)
  const str2 = str.replace(/<([a-zA-Z1-6]+)(\s*[^>]*)?>/g, '<$1>')
  const reg = /<a>(.*?)<\/a>/g
  return str2.replace(
    reg,
    (item, text) => `<span onclick="alert('#${text}')">${text}</span>`
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug {
    markdownRemark {
      html
      tableOfContents(pathToSlugField: "fields.permalink", absolute: false)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
