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
    column-gap: 30px;
`
const Image = styled(Img)`
    max-width: 250px;
    max-height: 200px;
    height: auto;
    align-self: center;
    justify-self: center;
    > picture > img {
      object-fit: contain !important;
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
        query GalleryQuery { allMarkdownRemark {
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
  </AppContextWrapper>
  );
}