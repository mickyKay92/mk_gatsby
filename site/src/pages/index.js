import React from 'react';
import { AppContextWrapper } from '../components//layout.js';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

const StyledHomeWrapper = styled.div`
    display: grid;
    grid-area: content;
    align-self: center;
    justify-self: center;
    grid-template-columns: 70vw;
    grid-template-rows: 70vh;
`

const StyledImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`
const Image = styled(Img)`
    max-width: 250px;
    max-height: 200px;
    height: auto;
    align-self: center;
    justify-self: center;
`

const StyledLink = styled(Link)`
    justify-self: center;
    align-self: center;
    width: 100%;
    height:100%;
`

export default () => {
  return (
  <AppContextWrapper>
    <StyledHomeWrapper>
      <StyledImagesWrapper>
        <StaticQuery query={graphql`
        query GalleryQuery {   allFile(filter:{relativePath:{regex:"/pages/detail/images/"}}){
          edges{
            node{
              childImageSharp{
                fluid(maxHeight: 200){
                  aspectRatio
                  srcWebp
                  sizes
                  srcSetWebp
                  src
                  srcSet
                }
              }
            }
          }
        }}
        `} render={data => (data.allFile.edges.map((gc, index) => (<StyledLink to={`detail/Crest`} key={index}>
          <Image fluid={gc.node.childImageSharp.fluid} alt={gc.node.childImageSharp.fluid.src} key={index} />
        </StyledLink>))
        )}/>
      </StyledImagesWrapper>
    </StyledHomeWrapper>
  </AppContextWrapper>
  );
}