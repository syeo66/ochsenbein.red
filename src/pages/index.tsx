import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage: React.FC = () => (
  <Layout>
    <SEO title="Home" />
    <h2>Hi people</h2>
    <p>
      Yeah, this is really my name. I'm a Software Developer with many years of experience. At the moment I am diving
      deep into Typescript, React, Svelte and game development using Unity. But I have experience in a lot of other
      languages and technologies like Go, Dart, Python and PHP. I already did a lot in my live, from being a banker,
      playing music on tour, jumping out of planes, being a music composer, to being a freelance web developer, and
      designing t-shirts.
    </p>
    <ul>
      <li>🌱 Vegan</li>
      <li>🚀 In love with rockets and space</li>
      <li>
        <strong>λ</strong> I prefer FP over OOP, but whatever gets the job done.
      </li>
      <li>
        🎵 <a href="https://music.redochsenbein.ch">My old music related website</a>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
