import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogArticle from "../components/blog-article"

const BlogTemplate = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const pageData = data.allMarkdownRemark.pageInfo

  const range = (start, end) => {
    const length = end - start
    return Array.from({ length }, (_, i) => start + i)
  }

  const pages = count => {
    return range(0, count)
  }

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      <section className="blog-feed">
        {posts.map(({ node }) => (
          <BlogArticle key={node.fields.slug} node={node} />
        ))}
      </section>
      {pageData.pageCount > 1 && (
        <div className="blog--page-iterator">
          {pageData.currentPage > 1 && (
            <div className="blog--page-iterator--item">
              <Link
                to={`/blog/${
                  pageData.currentPage === 2 ? "" : pageData.currentPage - 1
                }`}
              >
                go back!
              </Link>
            </div>
          )}

          {pages(pageData.pageCount).map((blah, i) => (
            <div
              className="blog--page-iterator--item"
              key={`blog-iterator-${i}`}
            >
              <Link to={`/blog/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
            </div>
          ))}

          {pageData.currentPage < pageData.pageCount && (
            <div className="blog--page-iterator--item">
              <Link to={`/blog/${pageData.currentPage + 1}`}>go forward!</Link>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}
export default BlogTemplate

export const pageQuery = graphql`
  query jfklsdQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        perPage
        pageCount
      }
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            published
            image
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
