import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import SocialIcons from '../components/socialIcons'

const Separator = styled.hr`
  margin-bottom: 0.725rem;
  margin-top: calc(0.725rem - 1px);
`

const SocialIconContainer = styled.div`
  font-size: 2rem;
  margin-top: 2rem;

  a {
    margin-left: 0.4rem;
    margin-right: 0.4rem;
  }
`

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <h2>Contact</h2>
    <div className="vcard">
      <div className="fn">Red Ochsenbein</div>
      {/*
      <div className="adr">
        <div className="street-address">Schmiedengasse 25</div>
        <span className="postal-code">3400</span> <span className="locality">Burgdorf</span>
      </div>
      <div className="country-name">Switzerland</div>
      */}
      <Separator />
      <div>
        Email: <a href="mailto:red@redochsenbein.ch">red@redochsenbein.ch</a>
      </div>
      <SocialIconContainer>
        <SocialIcons />
      </SocialIconContainer>
    </div>
  </Layout>
)

export default Contact
