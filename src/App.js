
import './App.css';
import Cart from './components/cart/Cart';
import Comments from './components/comments/Comments';
import Favorite from './components/favorite/Favorite';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { withAuth0 } from '@auth0/auth0-react';
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';

function App() {

const {  isAuthenticated } = useAuth0();
const[count,setCount]=useState(0);


  return (
    <div className="App">
      <Router>
        <Header count={count} />

        <  Routes>

          <Route exact path='/' element={<Home changeCount={count=>setCount(count)} />} />
          <Route exact path='/favorite' element={isAuthenticated&&<Favorite />} />
          <Route exact path='/comments' element={<Comments />} />
          <Route exact path='/cart' element={isAuthenticated&&<Cart changeCount={count=>setCount(count)} />} />
          <Route exact path='/profile' element={isAuthenticated&&<Profile />} />


        </  Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default withAuth0(App);
