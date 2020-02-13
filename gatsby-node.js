const path = require(`path`)
const moment = require(`moment`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { published: { eq: true } } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                slug
                published
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    // this looks at the actual file path to make the slug
    // const value = createFilePath({ node, getNode })

    const m = moment(node.frontmatter.date)
    const newslug = `${m.format("YYYY")}/${m.format("MM")}/${m.format("DD")}/${
      node.frontmatter.slug
    }`
    const value = `/posts/${newslug}`
    createNodeField({
      name: `slug`,
      node,
      value,
    })
    createNodeField({
      name: `published`,
      node,
      value: node.frontmatter.published,
    })
  }
}
