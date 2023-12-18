import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import images from '../../constants/images';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="app__navbar app__bg">
      <div className="app__navbar-logo">
        <img src={images.artic} alt="app__logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__tnroman">
          <a href="#home">HOME</a>
        </li>
        <li className="p__tnroman">
          <a href="#products">PRODUCTOS</a>
        </li>
        <li className="p__tnroman">
          <a href="#aboutUs">ABOUT</a>
        </li>
        <li className="p__tnroman">
          <a href="#contact">CONTACT</a>
        </li>
      </ul>
      <div className="app__navbar-login">
        <a href="#login" className="p__tnroman">
          <FaUserCircle />{' '}
        </a>
        <div />
        <a href="/" className="p__tnroman">
          <MdOutlineShoppingCart />
        </a>
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li>
                <a href="#home" onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href="#menu" onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href="#awards" onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
