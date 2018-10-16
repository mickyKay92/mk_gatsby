import React from 'react';
import Img from "gatsby-image"
import {AppContextWrapper} from '../components/layout.js'
import {graphql} from 'gatsby'

export default ({data}) => {
    const images = data.allMarkdownRemark.edges[0].node.frontmatter.images
    return (
        <AppContextWrapper>
            <div id="pieceDetail" className="content wrapper animation">
                <div className="pieceInfoGrid">
                    <div className="test grid-row-1 item-center-row">
                        <p className="pt-60 pb-60 pieceFontSize">{data.allMarkdownRemark.edges[0].node.frontmatter.info}</p>
                    </div>
                </div>
                <div className="pieceInfoImageGrid">
                {images.map((gc) => (<Img fluid={gc.childImageSharp.fluid} key={gc.childImageSharp.id}/>))}
                </div>
            </div>
        </AppContextWrapper>
    );
}

export const query = graphql`
query ($slug: String!) {
    allMarkdownRemark(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          frontmatter {
            title
            images {
              childImageSharp {
                id
                fluid(maxWidth: 1000) {
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