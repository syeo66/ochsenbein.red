import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import Seo from '../components/seo'

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Red Ochsenbein`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the
          "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <h2>Blog</h2>
      <BlogList>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <BlogEntry key={post.fields.slug}>
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <BlogHeading>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </BlogHeading>
                  <BlogDate>{post.frontmatter.date}</BlogDate>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </BlogEntry>
          )
        })}
      </BlogList>
    </Layout>
  )
}

const BlogList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
`

const BlogEntry = styled.li`
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding-bottom: 1rem;
`
const BlogDate = styled.small`
  font-family:
    'Spinnaker',
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans;
`

const BlogHeading = styled.h2`
  margin-bottom: 0;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-size: 150% 150%;
  background-image: linear-gradient(135deg, #933, #933, #f93, #933);
  background-position: 0 0;
  text-decoration: none;
`

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "D. MMMM YYYY")
          title
          description
        }
      }
    }
  }
`
