import React from 'react'
import styled from 'styled-components';
import {Link, StaticQuery, graphql} from 'gatsby';
import {AppContext} from './layout.js';
import Img from 'gatsby-image';

//TODO: Add animation to text and logo when menu slides out, Have the text and logo slide in a .5 second later and bounce.

const StyledMobileMenu = styled.div`
transform: translate(-200px);
width: 200px;
height: 100vh;
top: 62px;
background-color: rgb(74, 74, 74);
Z-Index: 4;
display: grid;
grid-template-areas: 
"mobile-menu-logo"
"links";
grid-template-columns: 100%;
grid-template-rows: auto 1fr;
position: fixed;
transition: transform .5s;
overflow-x: hidden;
> div > picture > img{
grid-area: mobile-menu-logo;
object-fit: contain !important;   
}
> div {
  margin: 10px 0px 10px 15px;
}
`

const StyledMenuButton = styled.img`
  width: 42px;
  margin: 10px 16px 10px 10px;
  transition: all .4s;
  justify-self: end;
  align-self: start;
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
}
`

const StyledHeader = styled.div`
display: grid;
grid-area: header;
grid-template-columns: auto auto;
height: auto;
position: sticky;
z-index: 5;
top: 0;
background-color: #f5f5f5;
box-shadow: 0px -8px 20px 0px black;
`

const StyledLogoLink = styled(Link)`
  margin: 10px 10px 10px 16px;
  padding: 0;
  align-self: center;
`
const StyledLink1 = styled(Link)`
  transition: transform .25s ease-in-out .25s;
  transform: translate(-200px);
`
const StyledLink2 = styled(Link)`
  transition: transform .25s ease-in-out .35s;
  transform: translate(-200px);
`

export default () =>{
    return(
      <AppContext.Consumer>
        {({ visible, updateVisible, menuOpen}) => (
          <StaticQuery query={graphql`query AssetQuery { logo:file (relativePath: {regex:"/logo/"}){childImageSharp{id
            fixed(width:48){src width height aspectRatio srcSet srcWebp srcSetWebp}
      }} menu:file(relativePath:{regex:"/menu/"}){ publicURL } }`} render={data =>(<>
          <StyledHeader>
          <StyledLogoLink to={'/'}><Img fixed={data.logo.childImageSharp.fixed} alt="logo" key={data.logo.childImageSharp.id}/></StyledLogoLink>
            <StyledMenuButton src={data.menu.publicURL} alt="Menu" onClick={updateVisible} style={visible ? menuOpen.button : null}></StyledMenuButton>
          </StyledHeader> 
            <StyledMobileMenu key="StyledMenu" style={visible ? menuOpen.menu : null}>
              <StyledNavLinksContainer>
                <StyledLink1 onClick={updateVisible} to={'/'} style={visible ? menuOpen.link : null}>Work</StyledLink1>
                <StyledLink2 onClick={updateVisible} to={'/aboutme'} style={visible ? menuOpen.link : null}>About</StyledLink2>
              </StyledNavLinksContainer>
            </StyledMobileMenu>
            </>
            )}/>
        )}
      </AppContext.Consumer>
    );
  }