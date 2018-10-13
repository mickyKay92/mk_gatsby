import React, {Component} from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import image1 from '../images/site_images/crest1.png';
import image2 from '../images/site_images/ite.png';
import image3 from '../images/site_images/purpleduck.png';
import image4 from '../images/site_images/redrock.png';
import image5 from '../images/site_images/seal1.png';
const image1o = {title: "crest1", image: image1}  
const image2o = {title: "ite", image: image2}
const image3o = {title: "purpleduck", image: image3}
const image4o = {title: "redrock", image: image4}
const image5o = {title: "seal", image: image5}

const imageSet = [image1o, image2o, image3o, image4o, image5o];
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
                {this.state.images.map((gc, index) => (<Link to={`/page-2/${gc.title}`} key={index}><ImgContainer key={index}>
                    <Image src={gc.image} alt={gc.title} key={index} /></ImgContainer></Link>))}
                    </StyledImagesWrapper>
            </StyledHomeWrapper>
        );
    }
};

export default Gallery;