import React, {Component, createContext} from 'react';
import styled from 'styled-components';
import Header from './header';
import MobileMenu from './mobilemenu.js';
import Helmet from 'react-helmet'
import { StaticQuery, graphql} from 'gatsby';
import posed from 'react-pose'
import './layout.css';
require('typeface-montserrat');


const ChildAnim = posed.div({
  enter:{
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 1440,
    opacity: 0,
  },
  menuVisible: {
    x: 200,
    transition: { duration: 300, ease: "easeInOut" },
  },
  menuHidden : {
    x: 0,
    transition: { duration: 300, ease: "easeInOut", delay: 250 }
}
});

const StyledChildAnim = styled(ChildAnim)`
  all: inherit;
`

const PosedHeader = posed(Header)({
  menuVisible: {
    x: 200,
    transition: { x: {duration: 300, ease: "easeInOut"} },
  },
  menuHidden : {
    x: 0,
    transition: { x: {duration: 300, ease: "easeInOut", delay: 250}  }
}
});

const PosedMobileMenu = posed(MobileMenu)({
  visible: {
    x: 0,
    transition: { 
      x: {
        ease: "easeInOut",
        duration: 300, 
      },
    },
  },
  hidden : {
    x: -250,
    transition: {
      x:{ 
        ease: "easeInOut",
        duration: 300,
        delay: 250,
      }
  },
}
});


const AppWrapper = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr;
  grid-template-areas: 
  "header"
  "content";
  touch-action: manipulation;
  `

  const Overlay = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    z-index: 3;
    transition: all .5s;
    pointer-events: none;
  `

export const AppContext = createContext();

export class AppContextWrapper extends Component{
    constructor(props){
      super(props);
      this.state = {
        isVisible: false,
        menuOpen: {
          button: {
            transform: 'rotate(90deg)'
          },
          contentOverlay: {
            background: 'rgba(245, 245, 245, 0.8)',
            pointerEvents: 'unset'
          },
          link: {
            transform: 'translate(0px)',
          },
          logo: {
            transform: 'translate(0px)',
          },
        },
      }
    }

    static getDerivedStateFromProps(props, state){
      console.log(`Props: ${props}`);
      console.log(`State: ${state}`)
    }
    updateContext = () => {this.setState({isVisible: !this.state.isVisible})};
    render(){
      const children = this.props.children;
      return(
        <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'Graphic design portfolio site', content: 'Graphic Design, Art, Logos etc.' },
                { name: 'Graphic Design, Portfolio, Art, Logo', content: '' },
              ]}>
            </Helmet>
            <AppWrapper>
              <AppContext.Provider value={({ visible: this.state.isVisible, updateVisible: this.updateContext, menuOpen: this.state.menuOpen })}>
                <PosedMobileMenu pose={this.state.isVisible ? "visible" : "hidden"}/>
                  <PosedHeader pose={this.state.isVisible ? "menuVisible" : "menuHidden"} visible={this.state.isVisible} updateVisible={this.updateContext} menuOpen={this.state.menuOpen}/>
                <Overlay style={this.state.isVisible ? this.state.menuOpen.contentOverlay : null} onClick={() => this.setState({ isVisible: false })} />
                <StyledChildAnim pose={this.state.isVisible ? "menuVisible" : "menuHidden"}>
                  {children}
                </StyledChildAnim>
              </AppContext.Provider>
            </AppWrapper>
        </>
        )}/>
      );
    }
  }