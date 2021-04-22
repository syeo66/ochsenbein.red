import { Link } from 'gatsby'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import Burger from './burger'
import SocialIcons from './socialIcons'

const Nav = styled.nav`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  @media screen and (min-width: 1024px) {
    right: 75%;
    min-width: 23rem;
  }
  flex-direction: column;
  transform: translateX(calc(-100% + 3.5rem));
  transition: transform 500ms, background-color 100ms;
  padding-right: 10%;
  z-index: 9999;

  &.active {
    background-color: #f3f3f3;
    transform: translateX(0);
    animation: slideInFromLeft 500ms ease-out 0 1;
    padding-right: 0;
    box-shadow: 0 0 70px rgba(120, 10, 10, 0.1), 0 0 40px rgba(120, 10, 10, 0.2), 0 0 20px rgba(120, 10, 10, 0.3);
    border-right: 1px solid rgba(120, 10, 10, 0.3);

    @keyframes slideInFromLeft {
      0% {
        transform: translateX(calc(-100% + 3.5rem));
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
  font-family: 'Spinnaker', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
  text-decoration: none;
  font-weight: normal;
  font-size: 2.5rem;
  white-space: nowrap;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-size: 150% 150%;
  background-image: linear-gradient(135deg, #999, #999, #933, #f93, #933);
  background-position: 0 0;
  transition: background-position 500ms;

  &:hover {
    background-position: 100% 100%;
  }

  &:first-child {
    padding-top: 4rem;
  }
`
const NavBurger = styled(Burger)`
  position: absolute;
  right: 0.5rem;
  top: 1rem;
`

const NavFooter = styled.div`
  margin-top: auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  font-size: clamp(1.4rem, 8vw, 2rem);

  a {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
  }
`

const Navigation: React.FC = () => {
  const [active, setActive] = useState(false)

  const handleBurgerClick = useCallback(() => setActive((a) => !a), [])

  return (
    <Nav className={active ? 'active' : ''}>
      <NavBurger active={active} onClick={handleBurgerClick} />
      <NavLink to="/">Home</NavLink>
      <NavLink to="/work/">Work</NavLink>
      <NavLink to="/contact/">Contact</NavLink>
      <NavFooter>
        <SocialIcons />
      </NavFooter>
    </Nav>
  )
}

export default Navigation
