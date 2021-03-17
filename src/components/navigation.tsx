import { Link } from 'gatsby'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Burger from './burger'

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
  transition: transform 500ms, background-color 500ms;
  padding-right: 10%;
  z-index: 9999;

  &.active {
    background-color: #eee;
    transform: translateX(0);
    animation: slideInFromLeft 500ms ease-out 0 1;
    padding-right: 0;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.1), 0 0 25px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.5);

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
  color: #666;
  font-weight: bold;
  font-size: 2.5rem;
  transition: color 500ms;
  white-space: nowrap;

  &:hover {
    color: #933;
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

const Navigation: React.FC = () => {
  const [active, setActive] = useState(false)

  const handleBurgerClick = useCallback(() => setActive((a) => !a), [])

  return (
    <Nav className={active ? 'active' : ''}>
      <NavBurger active={active} onClick={handleBurgerClick} />
      <NavLink to="/work/">Work</NavLink>
      <NavLink to="/about/">About</NavLink>
      <NavLink to="/contact/">Contact</NavLink>
    </Nav>
  )
}

export default Navigation
