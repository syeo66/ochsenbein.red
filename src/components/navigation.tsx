import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  @media screen and (min-width: 1024px) {
    right: 75%;
  }
  background-color: #eee;
  flex-direction: column;
  transform: translateX(-90%);
  transition: transform 500ms;

  :hover {
    transform: translateX(0);
    animation: 500ms ease-out 0s 1 slideInFromLeft;
    @keyframes slideInFromLeft {
      0% {
        transform: translateX(-90%);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
`
const NavLink = styled(Link)`
  display: block;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
    Helvetica Neue, sans-serif;
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 3rem;
  transition: color 500ms;

  &:hover {
    color: #933;
  }

  &:first-child {
    padding-top: 4rem;
  }
`

const Navigation: React.FC = () => {
  return (
    <Nav>
      <NavLink to="/page-2/">Page 2</NavLink>
      <NavLink to="/using-typescript/">TypeScript</NavLink>
    </Nav>
  )
}

export default Navigation
