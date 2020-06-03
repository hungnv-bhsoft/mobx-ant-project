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
import HomeAdmin from './components/page/DashBoard/HomeAdmin';

// import styled from 'styled-components';
//priveroute
import ProtectedRoute from './components/PrivateRoute/ProtectedRoute';
import AdminLogin from './components/page/AdminLogin';
import ManageCategories from './components/page/DashBoard/ManageCategories';
import ManageProduct from './components/page/DashBoard/ManageProduct';
import CreateProduct from './components/page/DashBoard/ManageProduct/Create';
import UpdateProduct from './components/page/DashBoard/ManageProduct/Update';
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
              <Route path="/adminlogin">
                <AdminLogin />
              </Route>
              {/* Privated */}
              <ProtectedRoute path="/dashboard">
                <HomeAdmin />
              </ProtectedRoute>
              <ProtectedRoute path="/setcategories">
                <ManageCategories />
              </ProtectedRoute>
              <ProtectedRoute path="/getproducts">
                <ManageProduct />
              </ProtectedRoute>
              <ProtectedRoute path="/createproduct">
                <CreateProduct />
              </ProtectedRoute>
              <ProtectedRoute path="/editproduct/:pId">
                <UpdateProduct />
              </ProtectedRoute>
              {/* Not page */}
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
    </Router>
    </>
  );

}

export default App;
