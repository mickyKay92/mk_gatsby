import React from 'react'
import styled from 'styled-components';
import {Link, StaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';
import posed from 'react-pose'

const PosedMenuBtn = posed.img({
  visible:{
    rotate: 90,
    transition:{duration: 250}
  },
  hidden:{
    rotate: 0,
    transition: {duration: 300}
  },
});

const StyledMenuButton = styled(PosedMenuBtn)`
  width: 42px;
  margin: 10px 10px 10px 16px;
  transition: all .4s;
  justify-self: start;
  align-self: center;
`
const StyledHeader = styled.div`
display: grid;
grid-area: header;
grid-template-columns: auto auto;
height: auto;
position: fixed;
z-index: 5;
top: 0;
width: 100vw;
background-color: #f5f5f5;
box-shadow: 0px -5px 22px -5px #00000085;
`

const StyledLogoLink = styled(Link)`
  margin: 10px 16px 10px 10px;
  padding: 0;
  align-self: center;
  justify-self: end;
`
export default ({visible, updateVisible, menuOpen, hostRef}) =>{
    return(
          <StaticQuery query={graphql`query AssetQuery { logo:file (relativePath: {regex:"/logo/"}){childImageSharp{id
            fixed(width:48){src width height aspectRatio srcSet srcWebp srcSetWebp}
      }} menu:file(relativePath:{regex:"/baseline-menu/"}){ publicURL } }`} render={data =>(
          <StyledHeader ref={hostRef}>
          <StyledMenuButton src={data.menu.publicURL} alt="Menu" onClick={updateVisible} pose={visible ? "visible" : "hidden"}></StyledMenuButton>
          <StyledLogoLink to={'/'}><Img fixed={data.logo.childImageSharp.fixed} alt="logo" key={data.logo.childImageSharp.id}/></StyledLogoLink>
          </StyledHeader> 
            )}/>
    );
  }