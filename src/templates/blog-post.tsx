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
          <h2 itemProp="headline">{post.frontmatter.title}</h2>
          <BlogDate>{post.frontmatter.date}</BlogDate>
        </Header>
        <BlogBody dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
      </Article>
      <nav className="blog-post-nav">
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
const BlogHeading = styled.h1`
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  font-family: 'Spinnaker', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
  background-size: 150% 150%;
  background-image: linear-gradient(135deg, #933, #933, #f93, #933);
  background-position: 0 0;
  text-decoration: none;
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
`
const BlogDate = styled.p`
  font-family: 'Spinnaker', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans;
`
const BlogBody = styled.section`
  & > p {
    margin-bottom: 0.75rem;
  }

  h3 {
    font-family: 'Algereya Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
      Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-weight: normal;
    font-size: 1.3rem;
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
