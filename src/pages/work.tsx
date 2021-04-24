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
    image: string
  }
}

const Work = () => {
  const {
    allDataJson: { edges: portfolio },
  } = useStaticQuery(graphql`
    query {
      allDataJson {
        edges {
          node {
            id
            name
            short
            image
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Page two" />
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
