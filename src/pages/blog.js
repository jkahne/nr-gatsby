import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogArticle from "../components/blog-article"

const Blog = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      <section className="blog-feed">
        {posts.map(({ node }) => (
          <BlogArticle key={node.fields.slug} node={node} />
        ))}
      </section>
    </Layout>
  )
}
export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
  }
`
