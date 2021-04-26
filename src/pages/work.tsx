import React, { useCallback, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import styled from 'styled-components'
import PortfolioEntry from '../components/portfolioEntry'

const Portfolio = styled.div`
  width: 100%;
  height: 600px;
`

interface CubeProps {
  active: number
}
const Cube = styled.div<CubeProps>`
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

  const handleClick = useCallback(() => setActive((a) => Math.min(a + 1, portfolio.length - 1)), [])

  return (
    <Layout>
      <SEO title="Work /// Red Ochsenbein" />
      <h2>Work</h2>
      <Portfolio onClick={handleClick}>
        <Cube active={active}>
          {portfolio.map(({ node: p }: WorkEntry, i: number) => (
            <PortfolioEntry key={p.id} entry={p} index={i} active={active} />
          ))}
        </Cube>
      </Portfolio>
    </Layout>
  )
}

export default Work
