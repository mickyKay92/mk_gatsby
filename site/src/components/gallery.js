import React, {Component} from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Layout from './layout.js';
import image1 from '../images/site_images/crest1.png';
import image2 from '../images/site_images/ite.png';
import image3 from '../images/site_images/purpleduck.png';
import image4 from '../images/site_images/redrock.png';
import image5 from '../images/site_images/seal1.png';
const imageSet = [image1, image2, image3, image4, image5];

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

class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            images: imageSet,
        }
    }
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return (
            <StyledHomeWrapper>
                <StyledImagesWrapper>
                {this.state.images.map((gc, index) => (<Link to={`/Detail/${index}`} key={index}><ImgContainer key={index}>
                    <Image src={gc} alt={index} key={index} /></ImgContainer></Link>))}
                    </StyledImagesWrapper>
            </StyledHomeWrapper>
        );
    }
};

export default Gallery;