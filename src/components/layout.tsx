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
import Navigation from './navigation'
import BackgroundAnimation from './backgroundAnimation'
import BackgroundImage from './backgroundImage'

const Page = styled.div`
  min-height: 100vh;
`

const Content = styled.main`
  transform: translateX(0);
  transition: transform 500ms;
  animation: 500ms ease-out 0s 1 slideInFromLeft;
  @media screen and (min-width: 768px) {
    padding-right: max(15%, 300px);
  }
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  border-top-right-radius: 0.5rem;
  font-size: 80%;
  background-color: rgba(255, 255, 255, 0.7);
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
    <>
      <Navigation />
      <BackgroundAnimation />
      <BackgroundImage />
      <Page>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <Content>{children}</Content>
        </div>
      </Page>
      <Footer>
        © {new Date().getFullYear() > 2021 && `2021 – `}
        {new Date().getFullYear()} Red Ochsenbein
      </Footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
