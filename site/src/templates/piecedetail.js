import React from 'react';
import Img from "gatsby-image"
import {AppContextWrapper} from '../components/layout.js'
import {graphql} from 'gatsby'

export default ({data}) => {
    const piece = data.allMarkdownRemark
    console.log(piece.edges[0].node)
    return (
        <AppContextWrapper>
            <div id="pieceDetail" className="content wrapper animation">
                <div className="pieceInfoGrid">
                    <div className="test grid-row-1 item-center-row">
                        <p className="pt-60 pb-60 pieceFontSize">{piece.edges[0].node.frontmatter.info}</p>
                    </div>
                </div>
                <div className="pieceInfoImageGrid">
                    <Img fluid={piece.edges[0].node.frontmatter.image.childImageSharp.fluid}/>
                </div>
            </div>
        </AppContextWrapper>
    );
}

export const query = graphql`
    query($slug: String!){
        allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } })
            {
            edges{
                node{
                    frontmatter{
                        image{
                            publicURL
                            childImageSharp{
                                fluid(maxWidth: 1000){
                                    aspectRatio
                                    src
                                    srcSet
                                    srcWebp
                                    srcSetWebp
                                    sizes
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`