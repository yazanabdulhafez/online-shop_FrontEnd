import React from 'react';
import './Header.css';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';


const Header = (props) => {
  const {isAuthenticated} = useAuth0();
  console.log(isAuthenticated);
  return (
    <header>


      <a href="#f" className='header_logo'>Online Shop</a>

      <nav className='nav_links'>
        <Link style={{ textDecoration: 'none',marginLeft:'10px' }} to="/">Home</Link>
        {isAuthenticated&&<Link style={{ textDecoration: 'none' }} to="/favorite">Favorite</Link>}
        {isAuthenticated&&<Link style={{ textDecoration: 'none' }} to="/cart"><GiShoppingCart /></Link>}
        {isAuthenticated&&<Link style={{ textDecoration: 'none' }} to="/myItems">MyItems</Link>}
        {isAuthenticated&&<Link style={{ textDecoration: 'none' }} to="/profile">Profile</Link>}
        {
          isAuthenticated ?
            <LogoutButton /> :
            <LoginButton />
        }
      </nav>

    </header>
  )
}

export default withAuth0(Header);