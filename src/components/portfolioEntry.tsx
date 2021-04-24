import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const EntryContainer = styled.div``
const EntryHeading = styled.h3``
const EntryBody = styled.div``

interface PortfolioEntryProps {
  entry: {
    id: string
    name: string
    short: string
    image: string
  }
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry: { name, short, image } }) => {
  return (
    <EntryContainer>
      <EntryHeading>{name}</EntryHeading>
      <EntryBody>{short}</EntryBody>
    </EntryContainer>
  )
}

export default PortfolioEntry
