import React, {Component, createContext} from 'react';
import styled from 'styled-components';
import Header from './header';
import MobileMenu from './mobilemenu.js';
import Helmet from 'react-helmet'
import { StaticQuery, graphql} from 'gatsby';
import posed, { PoseGroup } from 'react-pose'
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
    flip: true,
    left: 200,
    transition: { left: {duration: 300, ease: "easeInOut"} },
  },
  menuHidden : {
    flip: true,
    left: 0,
    transition: { left :{duration: 250, ease: "easeInOut", delay: 200} }
}
});

const StyledChildAnim = styled(ChildAnim)`
  all: inherit;
  position: relative !important;
  @media (max-width: 700px){
    top: 62px;
  }
`

const PosedHeader = posed(Header)({
  menuVisible: {
    left: 200,
    flip: true,
    transition: {left:{duration: 300, ease: "easeInOut"}},
  },
  menuHidden : {
    left: 0,
    flip: true,
    transition: {left: {duration: 250, ease: "easeInOut", delay: 200} }
}
});

const PosedMobileMenu = posed(MobileMenu)({
  visible: {
    delayChildren: 200,
    staggerChildren: 25,
    left: 0,
    flip: true,
    transition: { 
      left: {
        ease: "easeInOut",
        duration: 300, 
      },
      
    },
  },
  hidden : {
    left: -200,
    flip: true,
    transition: {
      left:{ 
        ease: "easeInOut",
        duration: 250,
        delay: 200,
      },
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
const timeout = 250
  const Overlay = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    z-index: 3;
    transition: all .5s;
    pointer-events: none;
  `
        const RoutesContainer = posed.div({
          enter:{ delay: timeout, delayChildren: timeout },
      })
export const AppContext = createContext();

export class Layout extends Component{
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
        },
      }
    }
    updateContext = () => {this.setState({isVisible: !this.state.isVisible})};
    render(){
      const {children, location} = this.props
      return(
        <PoseGroup>
          <RoutesContainer key={location.pathname}>
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
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                { name: 'Graphic design portfolio site', content: 'Graphic Design, Art, Logos etc.' },
                { name: 'Graphic Design, Portfolio, Art, Logo', content: '' },
              ]}>
            </Helmet>
            )}/>
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
        </RoutesContainer>
        </PoseGroup>
      );
    }
  }