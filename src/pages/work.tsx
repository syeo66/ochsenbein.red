import React, { useCallback, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import styled from 'styled-components'
import PortfolioEntry from '../components/portfolioEntry'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

const Portfolio = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
`

interface CubeProps {
  active: number
}
const PortfolioInner = styled.div<CubeProps>`
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
`

interface PortfolioControlProps {
  position?: 'left' | 'right'
  hidden?: boolean
}
const PortfolioControl = styled(FontAwesomeIcon)<PortfolioControlProps>`
  position: absolute;
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
`

interface WorkEntry {
  node: {
    id: string
    name: string
    short: string
    image: any
  }
}

const Work = () => {
  const {
    allPortfolioJson: { edges: portfolio },
  } = useStaticQuery(graphql`
    query {
      allPortfolioJson {
        edges {
          node {
            id
            name
            short
            image {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: TRACED_SVG)
              }
            }
          }
        }
      }
    }
  `)

  const [active, setActive] = useState(0)

  const handleNext = useCallback(() => setActive((a) => Math.min(a + 1, portfolio.length - 1)), [])
  const handlePrev = useCallback(() => setActive((a) => Math.max(a - 1, 0)), [])

  return (
    <Layout>
      <SEO title="Work /// Red Ochsenbein" />
      <h2>Work</h2>
      <Portfolio>
        <PortfolioControl icon={faArrowAltCircleRight} onClick={handleNext} hidden={active === portfolio.length - 1} />
        <PortfolioControl icon={faArrowAltCircleLeft} position="left" onClick={handlePrev} hidden={active === 0} />
        <PortfolioInner active={active}>
          {portfolio.map(({ node: p }: WorkEntry, i: number) => (
            <PortfolioEntry key={p.id} entry={p} index={i} active={active} />
          ))}
        </PortfolioInner>
      </Portfolio>
    </Layout>
  )
}

export default Work
