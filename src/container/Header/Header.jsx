import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__bg app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <h1>
        "Artic Gin: A local favorite born in a garage, now in your glass."
      </h1>
      <p className="p__tnroman" style={{ margin: '2rem 0' }}>
        Sumergite para explorar y descubrir el curioso mundo del Artic Gin
      </p>
      <button type="button" className="custom__button">
        Explore
      </button>
    </div>
  </div>
);

export default Header;
