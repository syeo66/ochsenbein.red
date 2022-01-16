import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

const BackgroundContainer = styled.div`
  position: fixed;
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
  max-height: 100vh;

  opacity: 0.1;
  @media screen and (max-width: 760px) {
    opacity: 0.1;
  }
  @media screen and (min-width: 760px) {
    opacity: 0.3;
  }
  @media screen and (min-width: 980px) {
    opacity: 0.5;
  }
  @media screen and (min-width: 1178px) {
    opacity: 0.7;
  }

  transition: opacity 1s;

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
    {
      placeholderImage: file(relativePath: { eq: "red.png" }) {
        childImageSharp {
          gatsbyImageData(width: 450, layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.gatsbyImageData) {
    return <div>Picture not found</div>
  }

  return (
    <ImageContainer>
      <GatsbyImage alt="" image={data.placeholderImage.childImageSharp.gatsbyImageData} />
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
