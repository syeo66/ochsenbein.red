import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const SiteTitle = styled(Link)`
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-size: 150% 150%;
  background-image: linear-gradient(135deg, #933, #933, #f93, #933);
  background-position: 0 0;
  text-decoration: none;
`

interface HeaderProps {
  siteTitle?: string
}
const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header
    style={{
      background: `transparent`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `3.45rem 1.0875rem 1.45rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <SiteTitle to="/">{siteTitle}</SiteTitle>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
