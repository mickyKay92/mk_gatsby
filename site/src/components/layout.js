import React from 'react';
import PropTypes from 'prop-types';
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

const Layout = ({ children }) => (
        <AppWrapper>
          <Header/>
          {children}
        </AppWrapper>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
