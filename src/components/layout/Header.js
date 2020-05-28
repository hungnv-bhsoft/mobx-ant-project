import React from 'react';
import styled from 'styled-components';
import {
    Link
} from 'react-router-dom';
//logo
import Logo from '../logo/Logo';
import CoffeeImg from '../../assets/images/coffee-shop.png';

import Nav from '../navigation/Nav';
import List from '../list/List';
import Item from '../list/Item';
import { BoxWrapper, BoxItem } from '../common';

const HeaderWrapper = styled.header`
    max-width: 100%;

`;
const LinkStyle = styled(Link)`
    color : ${ ({ theme }) => theme.colors.textDark };
`;

const Header = () => {
    return (
        <HeaderWrapper>
            <BoxWrapper
                padding={`0rem 5rem`}
                alignItems="center"
                justifyContent="space-between">
                <BoxItem style={{ width: '10rem' }}>
                    <LinkStyle to="/">
                    <Logo src={CoffeeImg} alt={`my logo`} />
                    </LinkStyle>
                </BoxItem>
                <BoxItem>
                <Nav>
                    <List
                        flexDirection
                        padding={`1rem`}
                        >
                        <Item>
                        <LinkStyle to="/">Home</LinkStyle>
                        </Item>
                        <Item>
                        <LinkStyle to="/products">Products</LinkStyle>
                        </Item>
                        <Item>
                        <LinkStyle to="/about">About Us</LinkStyle>
                        </Item>
                        <Item>
                        <LinkStyle to="/contact">Contact Us</LinkStyle>
                        </Item>
                    </List>
                </Nav>
                </BoxItem>
            </BoxWrapper>
        </HeaderWrapper>
    )
}

export default Header
