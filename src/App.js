import React from 'react';
import './App.less';
// react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
//layout
import Header from './components/layout/Header';
import Main from './components/layout/Main';
//page
import Home from './components/page/Home';
import Products from './components/page/Products';
import ProductDetail from './components/page/ProductDetail';
import Contact from './components/page/Contact';
import About from './components/page/About';
import NotFound from './components/page/NotFound';
//logo
import Logo from './components/logo/Logo';
import CoffeeImg from './assets/images/coffee-shop.png';

import Nav from './components/navigation/Nav';
import List from './components/list/List';
import Item from './components/list/Item';
import { BoxWrapper, BoxItem } from './components/common';
import styled from 'styled-components';



const LinkStyle = styled(Link)`
    color : ${ ({ theme }) => theme.colors.textDark };
`;

const App = () => {

  return (

    <Router>
    <div>
        <Header>
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
        </Header>
        <Main>
          <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/product/:pId">
                <ProductDetail />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
        </Main>
    </div>
    </Router>
  );

}

export default App;
