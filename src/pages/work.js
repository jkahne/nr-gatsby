import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import texas from "../assets/images/texas-sized-10-4.png"

const Work = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="about jeremy" />
      <div>about jeremy's work</div>
    </Layout>
  )
}
export default Work

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
