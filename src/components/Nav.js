import React from 'react';
import logo from '../images/logo192.png'

function Nav() {
  return (
    <nav>
      <ul className="nav-links">
        <li> <img src={logo} alt="Little Lemon" className="logo" /> </li>
        <li><a href="/">Home</a></li>
        <li><a href="/restaurants">Restaurants</a></li>
        <li><a href="/reservations">Reservations</a></li>
        <li><a href="/booking">Booking</a></li>
      </ul>
    </nav>
  );
}

export default Nav;
