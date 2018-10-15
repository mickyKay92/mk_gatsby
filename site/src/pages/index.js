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
    > picture > image {
      object-fit: contain;
    }
`

const StyledLink = styled(Link)`
    justify-self: center;
    align-self: center;
`

export default () => {
  return (
  <AppContextWrapper>
    <StyledHomeWrapper>
      <StyledImagesWrapper>
        <StaticQuery query={graphql`
        query GalleryQuery { allFile(filter:{relativePath:{regex:"/home/"}}){
          edges{
            node{
              childImageSharp{
								fixed(height: 100){
                  width
                  height
                  srcSet
                  srcWebp
                  srcSetWebp
                  src
                }
              }
            }
          }
        }
      }
        `} render={data => (data.allFile.edges.map((gc, index) => (<StyledLink to={`detail/steam`} key={index}>
          <Image fixed={gc.node.childImageSharp.fixed} alt={gc.node.childImageSharp.id} key={gc.node.childImageSharp.id} />
        </StyledLink>))
        )}/>
      </StyledImagesWrapper>
    </StyledHomeWrapper>
  </AppContextWrapper>
  );
}