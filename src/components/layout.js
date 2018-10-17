import React, {Component, createContext} from 'react';
import styled from 'styled-components';
import Header from './header';
import MobileMenu from './mobilemenu.js';
import Helmet from 'react-helmet'
import { StaticQuery, graphql} from 'gatsby';
import './layout.css';
require('typeface-montserrat');

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
          menu:{
            transform: 'translate(0px)',
            overflowX: 'visible',
          }, 
          button: {
            transform: 'rotate(90deg)'
          },
          content: {
            transform: 'translate(200px)',
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
                <MobileMenu />
                <Header />
                <Overlay style={this.state.isVisible ? this.state.menuOpen.contentOverlay : null} onClick={() => this.setState({ isVisible: false })} />
                {children}
              </AppContext.Provider>
            </AppWrapper>
        </>
        )}/>
      );
    }
  }