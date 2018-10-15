import React from 'react'
import styled from 'styled-components';
import {Link, StaticQuery, graphql} from 'gatsby';
import {AppContext} from './layout.js';

//TODO: Add animation to text and logo when menu slides out, Have the text and logo slide in a .5 second later and bounce.

const StyledMobileMenu = styled.div`
transform: translate(-200px);
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
transition: transform .5s;
overflow-x: hidden;
> img {min-width: 100px}
}
`

const StyledNavLink = styled(Link)`
display: block;
padding: 10px 10px 10px 15px;
text-decoration: none;
font-size: 16px;
color: #f5f5f5;
`

const StyledMobileMenuLogo = styled.img`
grid-area: mobile-menu-logo;
max-width: 100px;
margin: 10px 0px 10px 0px;
transform: unset;
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
`

const StyledHeader = styled.div`
display: grid;
grid-area: header;
height: auto;
`

export default () =>{
    return(
      <AppContext.Consumer>
        {({ visible, updateVisible, menuOpen, logoImg, menuImg}) => (
          <StaticQuery query={graphql`query AssetQuery { logo:file (relativePath: {regex:"/logo/"}){publicURL} menu:file(relativePath:{regex:"/menu/"}){ publicURL } }`} render={data =>(
          <StyledHeader>
            <StyledMobileMenu key="StyledMenu" style={visible ? menuOpen.menu : null}>
              <StyledMobileMenuLogo src={data.logo.publicURL} className="menuSiteLogo" alt="logo"/>
                <StyledNavLinksContainer>
                  <StyledNavLink onClick={updateVisible} to={'/'}>Work</StyledNavLink>
                  <StyledNavLink onClick={updateVisible} to={'/aboutme'}>About</StyledNavLink>
                </StyledNavLinksContainer>
              </StyledMobileMenu>
            <StyledMenuButton src={data.menu.publicURL} alt="Menu" onClick={updateVisible} style={visible ? menuOpen.button : null}></StyledMenuButton>
          </StyledHeader> 
          )}/>
        )}
      </AppContext.Consumer>
    );
  }