import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BoxBanner = styled.div`
    max-width: 100%;
    height: 70rem;
`;
const Img = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
`;

const ButtonNext = styled.div`
    right: 1.5rem;
`;
const ButtonPrev = styled.div`
    left: 1.5rem;
    z-index: 10;
`;

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
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
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            <BoxBanner>
                <Img src="https://www.liquidesign.co.uk/wp-content/uploads/2016/10/artisan-coffee-shop-putney-3-1920x1080.jpg" alt="shop" />
            </BoxBanner>
            <BoxBanner>
                <Img src="https://www.liquidesign.co.uk/wp-content/uploads/2016/10/brew92-coffee-shop-design-saudi-arabia-18-1920x1080.jpg" alt="shop" />
            </BoxBanner>
            <BoxBanner>
                <Img src="https://i.pinimg.com/originals/58/1b/63/581b634953d26dcb0805c4b26d95cbb4.jpg" alt="shop"/>
            </BoxBanner>
            <BoxBanner>
                <Img src="https://www.liquidesign.co.uk/wp-content/uploads/2017/04/brew92-coffee-shop-design-saudi-arabia-12-1920x1080.jpg" alt="shop"/>
            </BoxBanner>
        </Slider>
    )
}

export default Banner;
