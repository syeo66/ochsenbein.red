import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'
import { BreakPoint } from '../design-tokens'

interface EntryContainerProps {
  index: number
  isActive: boolean
}
const EntryContainer = styled.div<EntryContainerProps>`
  margin-bottom: 3rem;

  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    transform: translateX(${({ index }) => index * 100}%) rotateY(${({ isActive }) => (isActive ? 0 : 90)}deg)
      scaleX(${({ isActive }) => (isActive ? 1 : 0)});
    transition: opacity 500ms, transform 800ms;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    margin-bottom: 0;
  }
`
const EntryHeading = styled.h3`
  font-size: 1.1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
const EntryBody = styled.div``
const EntryImage = styled(GatsbyImage)`
  border-radius: 0.25rem;
  border: solid 1px #ddd;
  box-shadow: 0 0 45px rgba(120, 10, 10, 0.4);
`

interface PortfolioEntryProps {
  entry: {
    id: string
    name: string
    short: string
    image: {
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }
  index: number
  active: number
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({ entry: { name, short, image }, index, active }) => {
  return (
    <EntryContainer index={index} isActive={active === index}>
      <EntryImage alt="" image={image.childImageSharp.gatsbyImageData} />
      <EntryHeading>{name}</EntryHeading>
      <EntryBody>{short}</EntryBody>
    </EntryContainer>
  )
}

export default PortfolioEntry
