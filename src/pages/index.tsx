import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>
      Yeah, this is really my name. I'm the Head of (Software) Development at Mindfire, and I code. Currently I really
      like Typescript, Go and Dart. But I have experience in a lot of other languages and technologies. I already did a
      lot in my live, from being a banker, to work as music composer, to being a freelance web developer, and designing
      t-shirts.
    </p>
    <ul>
      <li>🌱 Vegan</li>
      <li>🚀 In love with rockets and space</li>
      <li>
        <strong>λ</strong> I prefer FP over OOP, but whatever gets the job done.
      </li>
    </ul>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)

export default IndexPage
