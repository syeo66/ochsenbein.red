import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { StyledComponent } from 'styled-components'

import { BreakPoint } from '../design-tokens'

const Portfolio = styled.div`
  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    position: relative;
    width: 100%;
    height: 600px;
  }
`

interface PortfolioControlProps {
  position?: 'left' | 'right'
  hidden?: boolean
}
export const PortfolioControl = styled(FontAwesomeIcon)<PortfolioControlProps>`
  display: none;
  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    position: absolute;
    display: block;
    font-size: 5rem;
    z-index: 1000;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9));
    top: 0;
    ${({ position }) =>
      position === 'left'
        ? `
    left:0;
    transform: translateX(-101%) scale(0.6);
    :hover {
      transform: translateX(-101%) scale(1) rotateZ(10deg);
    }
  `
        : `
    right: 0;
    transform: translateX(101%) scale(0.6);
    :hover {
      transform: translateX(101%) scale(1) rotateZ(-10deg);
    }
  `}
    cursor: pointer;
    transition: transform 400ms, opacity 1s;
    opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  }
`

interface PortfolieInnerProps {
  active: number
}
export const PortfolioInner = styled.div<PortfolieInnerProps>`
  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    position: relative;
    transition: transform 500ms;
    perspective: 2000px;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    transform: translateX(-${({ active }) => active * 100}%);
    > * {
      position: absolute;
      transform-origin: 50% 50%;
    }
  }
`

export default Portfolio
