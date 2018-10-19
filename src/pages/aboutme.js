import React from 'react';
import styled from 'styled-components';
import {AppContextWrapper} from '../components/layout.js';
import {graphql, StaticQuery} from 'gatsby';
import Img from 'gatsby-image';
import {AppContext} from '../components/layout.js';


require('typeface-montserrat');

const StyledAboutMeWrapper = styled.div`
    display: grid;
    grid-area: content;
    grid-template-columns: 40% 1fr;
    grid-template-areas: 
    "image title"
    "image text"
    "image social";
    grid-template-rows: auto auto 1fr;
    justify-self: center;
    align-self: center;
    width: 70vw;
    grid-gap: 20px;
    @media (max-width: 700px){
        grid-template-columns: 85vw;
        grid-template-areas: 
        "image" 
        "title"
        "text"
        "social";
        grid-template-rows: min-content min-content min-content min-content;
        justify-self: center;
        align-self: unset;
        width: unset;
    }
`

const StyledAboutMeImg = styled(Img)`
    grid-area: image;
    max-width: 500px;
    width: 100%;
    height: auto;
    justify-self: center;
    align-self: start;
    border-radius: 10px;
    @media (max-width: 700px){
        max-width: 100%;
        margin: 10px 0px 10px 0px;
    }
`

const StyledParagraph = styled.p`
    font-family: 'Montserrat', sans-serif;
    color: #4a4a4a;
    display: block;
    grid-area: text;
    text-align: left;
    height: min-content;
    @media (max-width: 700px){
    font-size: 13px;
    text-align: left;
    justify-self: center;
    align-self: center;
    max-width: 100%;
    margin: 0;
    }

`
const SocialWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto 1fr;
    grid-template-rows: auto;
    grid-area: social;
    align-self: end;
    > a {
        width: 32px;
        height: 100%;
    }
    @media (max-width: 700px){
        display: grid;
        grid-area: social;
        grid-template-columns: auto auto auto;
        grid-template-rows: auto;
        align-self: end;
        justify-self: unset;
        > a {
            justify-self: center;
        }
    }

`

const StyledH2 = styled.h2`
    font-family: 'Montserrat', sans-serif;
    color: #4a4a4a;
    font-weight: 600;
    grid-area: title;
    margin: 0;
    @media (max-width: 700px){
    grid-area: title;
    text-align: left;
    justify-self: center;
    align-self: center;
    max-width: 100%;
    width: 100%;
    margin: 0;
    }
`
export default () => {
    return(
    <AppContextWrapper>
    <AppContext.Consumer> 
    {({visible, menuOpen}) => (
        <StyledAboutMeWrapper style={visible ? menuOpen.content : null}>
            <StaticQuery query={graphql`query AboutMeQuery{file(relativePath: {regex:"/images/me/"}){
                childImageSharp{
                    fluid(maxWidth:500){
                        src
                        sizes
                        srcWebp
                        srcWebp
                        srcSet
                        aspectRatio
                    }}}}`} render={data => (<StyledAboutMeImg fluid={data.file.childImageSharp.fluid} key="abti"/>)}/>
            <StyledH2 key="abth">Hello!</StyledH2>
            <StyledParagraph key="abtp">
                My name is Michelle and I have been working as a freelance digital artist since 2013 creating digital paintings, illustrations and comics for various clients.
                <br />
                <br />
                In May of this year, I took the plunge into graphic design work for various clients around the world. I am confident with Adobe Photoshop, Illustrator, InDesign. As well as the Adobe Creative Suite, I use the digital illustration app ‘ProCreate’ on the iPad Pro. I'm also experienced with both the Windows and MacOS platforms.
                <br />
                <br />
                As I enjoy learning new skills, in my spare time I have completed an online course on HTML and CSS using Codecademy. If you'd like to get in contact with me please don't hesitate, My contact details are below!
            </StyledParagraph>
            <SocialWrapper key="aqa">
            <a href="mailto:michelle@mk-creativedesign.com" title="Email">
                <svg viewBox="0 0 512 512" fill="#4a4a4a">
                    <path d="M101.3 141.6v228.9h0.3 308.4 0.8V141.6H101.3zM375.7 167.8l-119.7 91.5 -119.6-91.5H375.7zM127.6 194.1l64.1 49.1 -64.1 64.1V194.1zM127.8 344.2l84.9-84.9 43.2 33.1 43-32.9 84.7 84.7L127.8 344.2 127.8 344.2zM384.4 307.8l-64.4-64.4 64.4-49.3V307.8z">
                    </path>
                </svg>
            </a>
            <a href="https://www.facebook.com/MKCreativeDesignNI/" title="Facebook">
                <svg viewBox="0 0 512 512" fill="#4a4a4a">
                    <path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z">
                    </path>
                </svg>
            </a>
            <a href="https://www.instagram.com/mk.creativedesign/" title="Instagram">
                <svg viewBox="0 0 512 512" fill="#4a4a4a">
                    <path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z"></path><path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z">
                    </path>
                    <circle cx="351.5" cy="160.5" r="21.5">
                    </circle>
                </svg>
            </a>
        </SocialWrapper>
        </StyledAboutMeWrapper>
    )}
    </AppContext.Consumer>
        </AppContextWrapper>
    );
}