import React, { useCallback, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Portfolio, { PortfolioControl, PortfolioInner } from '../components/portfolio'
import PortfolioEntry from '../components/portfolioEntry'

interface WorkEntry {
  node: {
    description: string
    id: string
    image: any
    name: string
    short: string
    tags: string[]
    website: string
  }
}

const Work = () => {
  const {
    allExperimentsJson: { edges: portfolio },
  } = useStaticQuery(graphql`
    query {
      allExperimentsJson {
        edges {
          node {
            id
            name
            short
            tags
            website
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

  const handleNext = useCallback(() => setActive((a) => a + 1), [])
  const handlePrev = useCallback(() => setActive((a) => a - 1), [])

  return (
    <Layout>
      <SEO title="Experiments" />
      <h2>Experiments</h2>
      <Portfolio>
        <PortfolioControl icon={faArrowAltCircleRight} onClick={handleNext} />
        <PortfolioControl icon={faArrowAltCircleLeft} position="left" onClick={handlePrev} />
        <PortfolioInner active={active} total={portfolio.length}>
          {portfolio.map(({ node: p }: WorkEntry, i: number) => (
            <PortfolioEntry key={p.id} entry={p} index={i} active={active} total={portfolio.length} />
          ))}
        </PortfolioInner>
      </Portfolio>
    </Layout>
  )
}

export default Work
