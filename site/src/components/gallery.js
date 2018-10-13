import React from 'react';
import { Link, navigate} from 'gatsby';
import styled from 'styled-components';
import {AppContext} from './layout.js';

const StyledHomeWrapper = styled.div`
    display: grid;
    grid-area: content;
    align-self: center;
    justify-self: center;
    grid-template-columns: 70vw;
    grid-template-rows: 70vh;
`

const StyledImagesWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`
const Image = styled.img`
    max-width: 250px;
    max-height: 200px;
    height: auto;
    align-self: center;
    justify-self: center;
`

const ImgContainer = styled.div`
    justify-self: center;
    align-self: center;
`

const Gallery = () => (
    <AppContext.Consumer>{({images}) => (
        <StyledHomeWrapper>
            <StyledImagesWrapper>
                {images.map((gc, index) => (<ImgContainer onClick={() =>{navigate(`detail/${gc.title}`, { state: { imageTitle: gc.title }})}} key={index}>
                    <Image src={gc.images[0]} alt={index} key={index} /></ImgContainer>))}
            </StyledImagesWrapper>
        </StyledHomeWrapper>
    )}
    </AppContext.Consumer>
);

export default Gallery;