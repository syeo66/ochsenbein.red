import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { BreakPoint } from '../design-tokens'

interface EntryContainerProps {
  index: number
  total: number
  isActive: boolean
  width: number
}
const EntryContainer = styled.div<EntryContainerProps>`
  margin-bottom: 3rem;

  @media screen and (min-width: calc(${BreakPoint.tablet} + 1px)) {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: opacity 500ms;
    transform: rotateY(${({ total, index }) => (360 / total) * index}deg)
      translateZ(${({ total, width }) => (width * 0.5) / Math.tan(Math.PI / total)}px);
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
    description?: string
    employer?: string
    id: string
    name: string
    short: string
    tags: string[]
    tasks?: string
    website: string
    client?: string
    image: {
      childImageSharp: {
        gatsbyImageData: any
      }
    }
  }
  index: number
  total: number
  active: number
}

const PortfolioEntry: React.FC<PortfolioEntryProps> = ({
  entry: { name, short, image, tags, tasks, employer, client, website },
  index,
  total,
  active,
}) => {
  const entryRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(entryRef.current?.offsetWidth || 0)
  }, [entryRef.current])

  return (
    <EntryContainer ref={entryRef} index={index} total={total} width={width} isActive={active === index}>
      <EntryImage alt="" image={image.childImageSharp.gatsbyImageData} />
      <EntryHeading>{name}</EntryHeading>
      <EntryBody>{short}</EntryBody>
      {website && (
        <a href={website} target="_blank" rel="noopener">
          {website}
        </a>
      )}
      <Separator />
      {tasks && <LabelEntry label="Task:">{tasks}</LabelEntry>}
      {client && <LabelEntry label="Client:">{client}</LabelEntry>}
      {employer && <LabelEntry label="Agency:">{employer}</LabelEntry>}
      <LabelEntry label="Tags:">{tags.join(', ')}</LabelEntry>
    </EntryContainer>
  )
}

export default PortfolioEntry
