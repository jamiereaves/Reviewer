import React, { Component } from 'react';


import { BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import './Main.css'
import Homepage from './pages/Homepage'
import AboutPage from './pages/About-Page';
import CreateUserPage from './pages/CreateUserPage';
import CreateWierdLocation from './pages/CreateWierdLocationPage';
import LoginPage from './pages/LoginPage'
import ShowAllProducts from './pages/ShowAllProductsPage';
import ShowOneLocation from './pages/AddCommentPage'
import SearchPage from './pages/SearchPage';
import requireAuth from './components/Auth'





const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component = {Homepage} exact/>
      <Route path ='/About' component = {AboutPage} exact/>

      <Route path='/createUser' component = {CreateUserPage}/>
      <Route path='/createNewLocation' component = {CreateWierdLocation}/>
      <Route path="/login" component = {LoginPage} exact/>
      {/* <Route path="/login" component = {LoginPage} exact/>
      <Route path="/articles/:_id" component = {OneArticle} exact/> */}
      <Route path='/allproducts' component = {ShowAllProducts} name="allproducts" exact/>
      <Route path='/location/:_id' component = {ShowOneLocation} name="location" exact/>
      <Route path='/search' component = {SearchPage} name="search" exact/>

      {/* begin I want this to be protected */}
      <Route path="/test/" component={App} onEnter={requireAuth}>
        <Route path="allproducts" component={ShowAllProducts}/>
      </Route> {/*  end I want this to be protected */}
      {/* <Route component = {Homepage}/> */}
    </Switch>
  </BrowserRouter>
)
export default App;

