import React from 'react'
import styled from 'styled-components';
import {Link, StaticQuery, graphql} from 'gatsby';
import {AppContext} from './layout.js';
import Img from 'gatsby-image';
import posed from 'react-pose'

const StyledMobileMenu = styled.div`
width: 200px;
height: 100vh;
background-color: rgb(74, 74, 74);
Z-Index: 5;
display: grid;
grid-template-areas: 
"mobile-menu-logo"
"links";
grid-template-columns: 100%;
grid-template-rows: auto 1fr;
position: fixed;
overflow-x: hidden;
> div > picture > img{
grid-area: mobile-menu-logo;
object-fit: contain !important;   
}
> div {
  margin: 10px 0px 10px 15px;
}
`
const PoseProps = {
  visible: {
    left: 0,
    flip: true,
    transition: { 
      left: {
        ease: "easeInOut",
        duration: 250, 
      },
    },
  },
  hidden : {
    left: -200,
    flip: true,
    transition: {
      left:{ 
        ease: "easeInOut",
        duration: 250 ,
        delay: 150,
      }
  },
}
}
const PosedLogoMobileMenu = posed(Link)(PoseProps);

const StyledLogoMobileMenu = styled(PosedLogoMobileMenu)`
  position: relative;
  margin: 10px 10px 10px 16px;
  padding: 0;
  align-self: center;
  justify-self: start;
`
const StyledNavLinksContainer = styled.div`
  grid-area: links;
  display: grid;
  grid-auto-rows: min-content;
  height: auto;
  > a {
  display: block;
  padding: 10px 10px 10px 0px;
  text-decoration: none;
  font-size: 16px;
  color: #f5f5f5;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  position: relative;
}
`

const PosedLink = posed(Link)(PoseProps);

export default ({hostRef}) => (
  <AppContext.Consumer>
  {({visible}) =>(
    <StyledMobileMenu key="StyledMenu" ref={hostRef}>
      <StaticQuery query={graphql`query MobileMenuAssetQuery {file (relativePath: {regex:"/logo/"}){childImageSharp{id
      fixed(width:92){src width height aspectRatio srcSet srcWebp srcSetWebp}
      }}}`} render={data =>(
        <StyledLogoMobileMenu to={'/'}><Img fixed={data.file.childImageSharp.fixed} alt="logo" key={data.file.childImageSharp.id}/></StyledLogoMobileMenu>
      )}/>
      <StyledNavLinksContainer>
        <PosedLink pose={visible ? "visible" : "hidden"}  to={'/'}>Work</PosedLink>
        <PosedLink pose={visible ? "visible" : "hidden"}  to={'/aboutme'}>About</PosedLink>
      </StyledNavLinksContainer>
    </StyledMobileMenu>
    )}
  </AppContext.Consumer>
)