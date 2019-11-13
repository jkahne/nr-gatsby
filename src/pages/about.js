import React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import texas from "../assets/images/texas-sized-10-4.png"

const About = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="about jeremy" />
      <Bio />
      <div>
        about jeremy
        <img src={texas} />
      </div>
    </Layout>
  )
}
export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
