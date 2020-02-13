import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogArticle = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  const img = require(`../assets/images/${node.frontmatter.image}`)

  return (
    <article className="blog-article">
      <h3>
        <Link to={node.fields.slug}>{title}</Link>
      </h3>
      <small>{node.frontmatter.date}</small>
      <img src={img} />
    </article>
  )
}
export default BlogArticle
