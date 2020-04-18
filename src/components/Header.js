import React, { useState } from 'react';
import Logo from '../images/new-logo.png';
import Links from './Links';

const Header = (props) => {

  const [activeId, setActiveId] = useState('home');

  const handleClick = (e) => {
    e.preventDefault();
    setActiveId(e.target.id);
    props.getIdSection(e.target.id);
  }

  return (
    <header className={`header_area ${props.mobileToggle === "active"? 'mobile-menu-hide': ''}`}>
      <div className="main_menu pt-triggers">
        <div className="logo">
          <img src={Logo} className="logo_img" alt="logo" />
        </div>
        <ul className="nav menu">
          <li><p className={`${activeId === "home"? 'active': ''} navigation_menu`} id="home" onClick={handleClick}>#Home</p></li>
          <li><p className={`${activeId === "portfolio"? 'active': ''} navigation_menu`} id="portfolio" onClick={handleClick}>#Portfolio</p></li>
          <li><p className={`${activeId === "service"? 'active': ''} navigation_menu`} id="service" onClick={handleClick}>#Service</p></li>
          <li><p className={`${activeId === "contact"? 'active': ''} navigation_menu`} id="contact" onClick={handleClick}>#Contact</p></li>
        </ul>
      </div>
      <div className="header_bottom">
        <a href="mailto:contact@minhtech.dev">
          <h6>contact@minhtech.dev</h6>
        </a>
        <a href="mailto:minh.a.h.nguyen1@gmail.com">
          <h6>minh.a.h.nguyen1@gmail.com</h6>
        </a>
        <Links />
      </div>
    </header>
  );
}

export default Header;
