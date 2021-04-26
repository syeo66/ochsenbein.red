import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import styled from 'styled-components'
import PortfolioEntry from '../components/portfolioEntry'

const Portfolio = styled.div``

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

  return (
    <Layout>
      <SEO title="Work /// Red Ochsenbein" />
      <h2>Work</h2>
      <Portfolio>
        {portfolio.map(({ node: p }: WorkEntry) => (
          <PortfolioEntry key={p.id} entry={p} />
        ))}
      </Portfolio>
    </Layout>
  )
}

export default Work
