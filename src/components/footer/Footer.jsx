import React from 'react'
import {FaFacebookF} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import {IoLogoTwitter} from 'react-icons/io'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <a href="#f" className='footer_logo'>Online Shop</a>
    <ul className='permaLinks'>
<li><a href="#home">Home</a></li>
<li><a href="#favorite">Favorite</a></li>
<li><a href="#cart">Cart</a></li>
<li><a href="#contact">Contact</a></li>
    </ul>

    <div className="footer_socials">
      <a href='https://facebook.com'><FaFacebookF /></a>
      <a href='https://instgram.com'><FiInstagram /></a>
      <a href='https://twitter.com'><IoLogoTwitter /></a>
    </div>

    <div className="footer_copyright">
      <small>
        &copy;2022
        All Rights Reserved 
      </small>
    </div>
      </footer>
  )
}

export default Footer