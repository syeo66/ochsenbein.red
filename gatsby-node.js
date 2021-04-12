/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// Also see: https://stackoverflow.com/questions/57264220/how-to-create-a-page-in-gatsby-from-json-file

exports.onCreateNode = ({ node }) => {
  console.log(node)
  console.log(`Node created of type "${node.internal.type}"`)
}
