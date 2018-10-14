import React from "react"
import { graphql } from "gatsby"
import { AppContextWrapper } from "../components/layout"
import styled from 'styled-components'

const StyledTestWrapper = styled.div`
    display: grid;
    justify-self: center;
    align-self: center;
`

const StyledH1 = styled.h1`
    border-bottom: 1px solid;
    display: inline block;
`

const StyledH3 = styled.h2`
    margin-bottom: 1px;
`

const StyledSpan = styled.span`
    color: #bbb;
`

export default ({ data }) => {
  console.log(data)
  return (
    <AppContextWrapper>
      <StyledTestWrapper>
        <StyledH1>
          Amazing Pandas Eating Things
        </StyledH1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <StyledH3>
              {node.frontmatter.title}{" "}
              <StyledSpan>
                — {node.frontmatter.date}
              </StyledSpan>
            </StyledH3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </StyledTestWrapper>
    </AppContextWrapper>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`