import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toJS } from 'mobx';

const BoxBanner = styled.div`
    max-width: 100%;
`;
const Img = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
`;

const ButtonNext = styled.div`
    right: 1.5rem;
    position: absolute;
    top: 50%;
    transform : translate(-50%,-50%);
`;
const ButtonPrev = styled.div`
    left: 1.5rem;
    z-index: 10;
`;

const Spinner = styled.div`
    position : absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 2rem;
    /* height: inherit; */
`;

const Banner = ({ images, loading }) => {
    // console.log(toJS(loading));
    console.log(toJS(images));
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow : <ButtonNext />,
        prevArrow : <ButtonPrev />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows : false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    arrows : false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows : false
                }
            }
        ]
    };
    return loading ? <Spinner>Loading...</Spinner> : (
        <Slider {...settings}>
            {images !== undefined && images.map( img => (
                <BoxBanner key={img.id}>
                    <Img src={img.image} alt="shop" />
                </BoxBanner>
            ))}
        </Slider>
    )
}

export default Banner;
