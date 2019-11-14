module.exports = {
  siteMetadata: {
    title: `Jeremy's Crap`,
    author: `Jeremy Kahne`,
    description: ``,
    siteUrl: `https://sad-goldwasser-171981.netlify.com/`,
    social: {
      twitter: `jeremykahne`,
    },
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        // exclude: ["/category/*", `/path/to/page`],
        //
        // THIS ISN'T WORKING
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allMarkdownRemark(filter: {fields: {published: {eq: true}}}) {
             nodes {
               fields {
                 slug
               }
             }
          }
          allSitePage(filter: {path: {regex: "/^(?!\\/posts)/"}})  {
            edges {
              node {
                path
              }
            }
          }
      } `,
        //      WHAT I WANT:
        //
        // {
        //   posts: allMarkdownRemark(filter: {fields: {published: {eq: true}}}) {
        //     entries: nodes {
        //       post: fields {
        //         path: slug
        //       }
        //     }
        //   }
        //   pages: allSitePage(filter: {path: {regex: "/^(?!\\/posts)/"}}) {
        //     entries: edges {
        //       page: node {
        //         path
        //       }
        //     }
        //   }
        // }

        // serialize: ({ site, allSitePage }) =>
        //   allSitePage.edges.map(edge => {
        //     return {
        //       url: site.siteMetadata.siteUrl + edge.node.path,
        //       changefreq: `daily`,
        //       priority: 0.7,
        //     }
        //   })
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`, // needs to be at very bottom
  ],
}
