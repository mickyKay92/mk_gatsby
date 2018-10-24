import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
import {AppContext} from '../components/layout.js';


const StyledHomeWrapper = styled.div`
    display: grid;
    grid-area: content;
    align-self: center;
    justify-self: center;
    grid-template-columns: 70vw;
    grid-template-rows: 70vh;
    @media (max-width: 700px){
      grid-template-rows: auto;
      grid-template-columns: 90vw;
      margin-top: 5vh;
    }

`

const StyledImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(305px, 1fr));
    column-gap: 30px;
    @media (max-width: 700px){
      row-gap: 30px;
    }
    
`
const Image = styled(Img)`
    max-width: 250px;
    max-height: 200px;
    height: auto;
    align-self: center;
    justify-self: center;
    > picture > img {
      object-fit: contain !important;
      border-radius: 5px;
    }
`

const StyledLink = styled(Link)`
    justify-self: center;
    align-self: center;
`
export default () => {
  return (
    <AppContext.Consumer> 
    {({visible, updateVisible}) => (
      <StyledHomeWrapper onLoad={()=>{setTimeout(visible ? updateVisible : null, 850)}}>
        <StyledImagesWrapper>
          <StaticQuery query={graphql`
            query GalleryQuery { allMarkdownRemark(sort:{fields:frontmatter___title,order:DESC}) {
              edges {
                node {
                  frontmatter {
                    title
                    images {
                      childImageSharp {
                        id
                        fixed(height: 100) {
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
            }
          }
          `} render={data => (data.allMarkdownRemark.edges.map((gc, index) => (<StyledLink to={`detail/${gc.node.frontmatter.title}`} key={index}>
            <Image fixed={gc.node.frontmatter.images[0].childImageSharp.fixed} alt={gc.node.frontmatter.images[0].childImageSharp.id} key={gc.node.frontmatter.images[0].childImageSharp.id} />
          </StyledLink>))
          )}/>
        </StyledImagesWrapper>
      </StyledHomeWrapper>
    )}
    </AppContext.Consumer>
  );
}