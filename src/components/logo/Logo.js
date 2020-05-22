import React from 'react';
import styled from 'styled-components';

const ImgStyle = styled.img`
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
`;


const Logo = ({ src, alt}) => {
    return <ImgStyle src={src}  alt={alt} />
}

export default Logo
