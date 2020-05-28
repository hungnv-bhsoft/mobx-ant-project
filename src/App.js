import React from 'react';
import './App.less';
// react router
import {
  Router,
  Switch,
  Route
} from 'react-router-dom';
//layout
// import Header from './components/layout/Header';
// import Main from './components/layout/Main';
//page
import Home from './components/page/Home';
import Products from './components/page/Products';
import ProductDetail from './components/page/ProductDetail';
import Contact from './components/page/Contact';
import About from './components/page/About';
import NotFound from './components/page/NotFound';
import Dashboard from './components/page/DashBoard';

// import styled from 'styled-components';
//priveroute
import ProtectedRoute from './components/PrivateRoute/ProtectedRoute';
import AdminLogin from './components/page/AdminLogin';

import history from './utils/history';


const App = () => {

  return (
    <>
    <Router history={history}>
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
              <ProtectedRoute path="/admin">
                <Dashboard />
              </ProtectedRoute>
              <Route path="/adminlogin">
                <AdminLogin />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
    </Router>
    </>
  );

}

export default App;
