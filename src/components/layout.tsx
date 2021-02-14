/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Header from './header'
import './layout.css'
import background from '../images/redbackground.jpg'

const Page = styled.div`
  min-height: 100vh;
  background-color: white;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${background});
  background-size: cover;
  background-position: 90% 0;
  @media screen and (min-width: 768px) {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.3)), url(${background});
    background-position: 100% 0;
  }
  background-repeat: no-repeat;
  background-blend-mode: normal;
`

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Page>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
          © {new Date().getFullYear()} Red Ochsenbein
        </footer>
      </div>
    </Page>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
