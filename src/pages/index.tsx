import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>Hi people</h2>
    <p>
      Yeah, Red is really my name. I'm the Head of (Software) Development at Mindfire, and I code. Currently I really
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
  </Layout>
)

export default IndexPage
