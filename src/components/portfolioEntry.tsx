import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import styled from 'styled-components'

interface EntryContainerProps {
  index: number
  isActive: boolean
}
const EntryContainer = styled.div<EntryContainerProps>`
  transform: translateX(${({ index }) => index * 100}%) rotateY(${({ isActive }) => (isActive ? 0 : 90)}deg)
    scaleX(${({ isActive }) => (isActive ? 1 : 0)});
  transition: opacity 500ms, transform 800ms;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
`
const EntryHeading = styled.h3``
const EntryBody = styled.div``
const EntryImage = styled(GatsbyImage)`
  border-radius: 0.25rem;
  border: solid 1px #ddd;
  box-shadow: 0 23.1px 31px rgba(0, 0, 0, 0.038), 0 28px 56.1px rgba(0, 0, 0, 0.065),
    0 29.5px 79.8px rgba(0, 0, 0, 0.091), 0 31.6px 113.3px rgba(0, 0, 0, 0.128), 0 46px 225px rgba(0, 0, 0, 0.26);
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
