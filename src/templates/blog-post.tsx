import React from 'react'
import styled from 'styled-components'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

interface BlogPostTemplateProps {
  data: any
  location: string
}
const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Red Ochsenbein`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
      <Article className="blog-post" itemScope itemType="http://schema.org/Article">
        <Header>
          <BlogHeading itemProp="headline">{post.frontmatter.title}</BlogHeading>
          <BlogDate role="time" dateTime={new Date().toISOString()}>
            {post.frontmatter.date}
          </BlogDate>
        </Header>
        <BlogBody dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
      </Article>
      <nav className="blog-post-nav" role="navigation">
        <BlogPagination>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </BlogPagination>
      </nav>
    </Layout>
  )
}

const Article = styled.article``
const Header = styled.header``
const BlogHeading = styled.h2`
  margin-bottom: 0.2rem;
`
const BlogDate = styled.time`
  font-family: 'Spinnaker', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans;
  margin-bottom: 1rem;
  display: block;
`
const BlogBody = styled.section`
  hyphens: auto;

  & > p {
    margin-bottom: 0.85rem;
  }

  h2 {
    margin-bottom: 0.85rem;
  }

  h3 {
    font-family: 'Algereya Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: normal;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  .gatsby-highlight pre {
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 0, 0, 0.2);
    padding: 0.25em 0.5em;
  }

  blockquote {
    position: relative;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem 1.5rem;

    &:before {
      content: '“';
      font-size: 5rem;
      margin-left: -2.5rem;
      margin-top: 0.5rem;
      position: absolute;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`

const BlogPagination = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    width: 100%;
  }

  li:last-child {
    text-align: right;
  }
`

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "D. MMMM YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
