import React, {Component, createContext} from 'react';
import styled from 'styled-components';
import Header from './header';
import './layout.css';

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
      }
    }
    updateContext = () => {this.setState({isVisible: !this.state.isVisible})};
    render(){
      const children = this.props.children;
      console.log(this.props.data);
      return(
        <AppWrapper>
        <AppContext.Provider value={({visible: this.state.isVisible, updateVisible: this.updateContext, menuOpen: this.state.menuOpen})}>
        <Header/>
          {children}
        </AppContext.Provider>
        </AppWrapper>
      );
    }
  }