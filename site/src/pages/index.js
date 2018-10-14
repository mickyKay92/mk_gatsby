import React from 'react';
import Gallery from '../components/gallery';
import {AppContextWrapper} from '../components//layout.js';


const IndexPage = () => (
  <AppContextWrapper>
    <Gallery/>
  </AppContextWrapper>
)

export default IndexPage
