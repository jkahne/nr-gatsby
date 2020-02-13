/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="bio">
      <div className="bio-contents">
        <Image
          fluid={data.avatar.childImageSharp.fluid}
          alt={author}
          className="avatar"
        />

        <p>
          Written by <strong>{author}</strong> who lives and works in Cincinnati
          building useful things.{" "}
          <a href={`https://twitter.com/${social.twitter}`}>
            You should follow him on Twitter
          </a>
          github linkedin twitter
        </p>
      </div>
    </div>
  )
}

export default Bio

/*     

        style={{
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}


      <div>
        {% for i in site.social-urls %}
        <a href="{{ i.url }}" target="_blank"><i class="fa fa-{{ i.fa }} fa-2x social_url"></i></a>
        {% endfor %}
      </div>

          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed_tracedSVG
          }

      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />


*/
