import React from 'react';
import Img from "gatsby-image"
import {graphql} from 'gatsby'
import styled from 'styled-components'


const StyledDetailWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 70vw;
  grid-template-rows: min-content;
  justify-content: center;
  grid-template-areas: 
  "text"
  "images";
  @media only screen and (max-width: 768px){
    grid-template-columns: 90vw;
  }
`
const StyledParagraph = styled.p`
  font-size: 17px;
  grid-area: text;
  font-family: 'Montserrat', sans-serif;
  color: #4a4a4a;
  font-size: 13px;
  font-weight: 500;
  padding: 50px 0px 50px 0px;
`

const StyledDetailImageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-area: images;
  grid-template-rows: auto;
  row-gap: 20px;
`

const StyledImg = styled(Img)`
  padding: 10px;
  > picture > img {
      object-fit: contain !important;
      border-radius: 5px !important;
  }
`

export default ({data}) => {
  const images = data.allMarkdownRemark.edges[0].node.frontmatter.images
  return (
    <StyledDetailWrapper>
      <StyledParagraph>{data.allMarkdownRemark.edges[0].node.frontmatter.info}</StyledParagraph>
      <StyledDetailImageWrapper>
        {images.map((gc) => (<StyledImg fluid={gc.childImageSharp.fluid} key={gc.childImageSharp.id} />))}
      </StyledDetailImageWrapper>
    </StyledDetailWrapper>
  );
}
  
export const query = graphql`
query ($slug: String!) {
    allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          frontmatter {
            title
            info
            images {
              childImageSharp {
                id
                fluid(maxWidth: 1500) {
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  } 
`