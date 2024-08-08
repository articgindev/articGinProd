import React, { useState, useEffect, useRef } from 'react';
import './Menu.css';
import ginImage from '../assets/menuOptions/menuArticGin1.png';
import shopImage from '../assets/menuOptions/menuShop2.png';
import botanicosImage from '../assets/menuOptions/menuBotanicos3.png';
import origenImage from '../assets/menuOptions/menuOrigen4.png';
import ecoImage from '../assets/menuOptions/menuEco5.png';
import nosotrosImage from '../assets/menuOptions/menuContacto6.png';
import showMenu from '../assets/buttons/montanaScrollIzq.png';

const sections = [
  { id: 'gin-section', name: 'GIN', image: ginImage },
  { id: 'shop-section', name: 'SHOP', image: shopImage },
  {
    id: 'botanicos-section',
    name: 'BOTANICOS',
    image: botanicosImage,
    special: true,
  },
  { id: 'origen-section', name: 'ORIGEN', image: origenImage },
  { id: 'eco-section', name: 'ECO', image: ecoImage },
  { id: 'nosotros-section', name: 'NOSOTROS', image: nosotrosImage },
];

const Menu = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            current = section.id;
          }
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set the initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkStyle = (index) => {
    if (sections[index].id === hoveredSection) {
      return { color: 'white', fontSize: '1.65em' };
    }
    if (sections[index].id === currentSection) {
      return { color: 'white', fontSize: '1.65em' };
    }
    const sectionIndex = sections.findIndex(
      (section) => section.id === currentSection
    );
    const opacity = 1 - Math.abs(sectionIndex - index) * 0.15;
    return { color: `rgba(255, 255, 255, ${opacity})` };
  };

  const handleHover = (sectionId) => {
    setHoveredSection(sectionId);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToggleMenu(false);
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  const handleSwipeLeft = () => {
    setToggleMenu(false);
    if (hoveredSection) {
      document
        .getElementById(hoveredSection)
        .scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleWheel = (event) => {
      event.stopPropagation();
    };

    const menuOverlay = document.querySelector('.menu-overlay');
    if (menuOverlay) {
      menuOverlay.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (menuOverlay) {
        menuOverlay.removeEventListener('wheel', handleWheel);
      }
    };
  }, [toggleMenu]);

  const getImageClassName = (section) => {
    return section.special ? 'menu-image special' : 'menu-image';
  };

  return (
    <div className="menu">
      <button onClick={() => setToggleMenu(!toggleMenu)}>
        <img className="showMenu" src={showMenu} />
      </button>
      <div className={`menu-overlay ${toggleMenu ? 'open' : ''}`}>
        <ul className="menu-links">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onMouseEnter={() => handleHover(section.id)}
                onClick={() => {
                  setToggleMenu(false);
                  setCurrentSection(section.id);
                  document
                    .getElementById(section.id)
                    .scrollIntoView({ behavior: 'smooth' });
                }}
                style={getLinkStyle(index)}
              >
                <img
                  src={section.image}
                  alt={section.name}
                  className={getImageClassName(section)}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
