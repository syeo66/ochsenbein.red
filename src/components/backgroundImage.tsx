import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const BackgroundContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
`

const ImageContainer = styled.div`
  max-width: 500px;
  width: 70%;
  position: absolute;
  bottom: -4px;
  right: 5%;

  opacity: 0.2;
  @media screen and (min-width: 1178px) {
    opacity: 0.7;
  }
  @media screen and (min-width: 980px) {
    opacity: 0.5;
  }
  transform: translateX(0);
  animation: slideInFromRight 1000ms ease-out 0ms 1;
  @keyframes slideInFromRight {
    0% {
      transform: translateX(200%);
    }
    100% {
      transform: translateX(0);
    }
  }
`

const Red = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "red.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <ImageContainer>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} />
    </ImageContainer>
  )
}

const BackgroundImage = () => {
  return (
    <BackgroundContainer>
      <Red></Red>
    </BackgroundContainer>
  )
}
export default BackgroundImage
