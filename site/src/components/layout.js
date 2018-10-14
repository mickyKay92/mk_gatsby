import React, {Component, createContext} from 'react';
import styled from 'styled-components';
import Header from './header';
import './layout.css';

import image1 from '../images/site_images/crest1.png';
import image2 from '../images/site_images/ite.png';
import image3 from '../images/site_images/purpleduck.png';
import image4 from '../images/site_images/redrock.png';
import image5 from '../images/site_images/seal1.png';

const crest1 = {title: "crest1", images: [image1, image1]}
const ite = {title: "ite", images: [image2, image2]}
const purpleduck = {title: "purpleduck", images: [image3, image3]}
const redrock = {title: "redrock", images: [image4, image4]}
const seal1 = {title: "seal1", images: [image5, image5]}

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

export const AppContext = createContext();

export class AppContextWrapper extends Component{
    constructor(props){
      super(props);
      this.state = {
        isVisible: false,
        menuOpen: {
          menu:{
            width: '200px',
            transition: 'all .5s',
            overflowX: 'visible',
          }, 
          button: {
            transform: 'rotate(90deg)'
          }
        },
        imageSet: [crest1, ite, purpleduck, redrock, seal1]
      }
    }
    updateContext = () => {this.setState({isVisible: !this.state.isVisible})};
    render(){
      const children = this.props.children;
      return(
        <AppWrapper>
        <AppContext.Provider value={({images: this.state.imageSet, visible: this.state.isVisible, updateVisible: this.updateContext, menuOpen: this.state.menuOpen})}>
        <Header/>
          {children}
        </AppContext.Provider>
        </AppWrapper>
      );
    }
  }