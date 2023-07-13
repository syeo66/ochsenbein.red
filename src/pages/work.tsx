import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useCallback, useState } from 'react'

import Layout from '../components/layout'
import Portfolio, { PortfolioControl, PortfolioInner } from '../components/portfolio'
import PortfolioEntry from '../components/portfolioEntry'
import SEO from '../components/seo'

interface WorkEntry {
  node: {
    client: string
    description: string
    employer: string
    id: string
    image: any
    name: string
    short: string
    tags: string[]
    tasks: string
    website: string
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
            description
            tasks
            tags
            employer
            website
            client
            image {
              childImageSharp {
                gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED)
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
      <SEO title="Work" />
      <h2>Work</h2>
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
