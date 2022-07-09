import React from 'react';
import './Header.css';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton';
import LogoutButton from '../LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';


const Header = (props) => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className='nav_bar'>
      <Container className="navbar_container">
        <div>
        <Navbar.Brand href="/" >Online Shop</Navbar.Brand>
        </div>
        <div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav >
            <Nav.Link><Link className="navBar_link" to="/">Home</Link></Nav.Link>
            {isAuthenticated && <Nav.Link><Link className="navBar_link" to="/favorite">Favorite{" "}
            <Badge  bg="danger" badgeContent={1}>{1}</Badge></Link></Nav.Link>}
            {isAuthenticated && <Nav.Link><Link className="navBar_link" to="/cart">
              
              <GiShoppingCart />{" "}
              <Badge color="secondary" badgeContent={1}>{1}</Badge>
              
            </Link></Nav.Link>}
            {isAuthenticated && <Nav.Link><Link className="navBar_link" to="/myItems">MyItems{" "}
            <Badge  bg="warning" badgeContent={1}>{1}</Badge>
            </Link></Nav.Link>}
            {isAuthenticated && <Nav.Link><Link className="navBar_link" to="/profile">Profile</Link></Nav.Link>}
            </Nav>

            <Nav>
            {
              isAuthenticated ?
                <LogoutButton /> :
                <LoginButton />
            }
            </Nav>

        
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>

  )
}

export default withAuth0(Header);