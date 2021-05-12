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

const Separator = styled.hr`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

interface LabelEntryProps {
  label: string
}
const Label = styled.strong`
  margin-right: 1rem;
  width: 4rem;
  display: inline-block;
  flex-shrink: 0;
  white-space: nowrap;
`
const LabelEntryBody = styled(EntryBody)`
  display: flex;
`
const LabelEntry: React.FC<LabelEntryProps> = ({ children, label }) => (
  <LabelEntryBody>
    <Label>{label}</Label> {children}
  </LabelEntryBody>
)

interface PortfolioEntryProps {
  entry: {
    description: string
    employer: string
    id: string
    name: string
    short: string
    tags: string[]
    tasks: string
    website: string
    client: string
    image: {
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }
  index: number
  active: number
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({
  entry: { name, short, image, tags, tasks, employer, client, website },
  index,
  active,
}) => {
  return (
    <EntryContainer index={index} isActive={active === index}>
      <EntryImage alt="" image={image.childImageSharp.gatsbyImageData} />
      <EntryHeading>{name}</EntryHeading>
      <EntryBody>{short}</EntryBody>
      {website && (
        <a href={website} target="_blank">
          {website}
        </a>
      )}
      <Separator />
      <LabelEntry label="Task:">{tasks}</LabelEntry>
      <LabelEntry label="Client:">{client}</LabelEntry>
      <LabelEntry label="Agency:">{employer}</LabelEntry>
      <LabelEntry label="Tags:">{tags.join(', ')}</LabelEntry>
    </EntryContainer>
  )
}

export default PortfolioEntry
