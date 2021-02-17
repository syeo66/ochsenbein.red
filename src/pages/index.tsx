import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import BackgroundAnimation from '../components/backgroundAnimation'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <BackgroundAnimation />
    <h1>Hi people</h1>
    <p>Welcome to my realm.</p>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
