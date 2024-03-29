import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { BreakPoint } from '../design-tokens'

const Portfolio = styled.div`
  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    position: relative;
    width: 100%;
    height: fit-content;
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
    &:hover {
      transform: translateX(-101%) scale(1) rotateZ(10deg);
    }
  `
        : `
    right: 0;
    transform: translateX(101%) scale(0.6);
    &:hover {
      transform: translateX(101%) scale(1) rotateZ(-10deg);
    }
  `}
    cursor: pointer;
    transition:
      transform 400ms,
      opacity 1s;
    opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  }
`

interface PortfolioSceneProps {
  height: number
}
const PortfolioScene = styled.div<PortfolioSceneProps>`
  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    position: relative;
    perspective: 1000px;
    width: 100%;
    height: ${({ height }) => height}px;
  }
`

interface PortfolioCarouselProps {
  zOffset: number
  rotation: number
}
const PortfolioCarousel = styled.div<PortfolioCarouselProps>`
  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transform: translateZ(${({ zOffset }) => zOffset}px) rotateY(${({ rotation }) => rotation}deg);
    transition: transform 500ms;
  }
`

interface PortfolioInnerProps {
  active?: number
  total: number
}
export const PortfolioInner: React.FC<PropsWithChildren<PortfolioInnerProps>> = ({ children, total, active = 0 }) => {
  const entryRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!entryRef.current) {
      return
    }
    setWidth(entryRef.current.offsetWidth || 0)
    const children = entryRef.current.getElementsByTagName('div')
    let max = 0
    for (let i = 0; i < children.length; i++) {
      const node = children.item(i)
      max = Math.max(max, node?.offsetHeight || 0)
    }
    setHeight(max + 30)
  }, [])

  return (
    <PortfolioScene height={height}>
      <PortfolioCarousel
        ref={entryRef}
        rotation={-((360 / total) * active)}
        zOffset={-((width * 0.5) / Math.tan(Math.PI / total))}
      >
        {children}
      </PortfolioCarousel>
    </PortfolioScene>
  )
}

export default Portfolio
