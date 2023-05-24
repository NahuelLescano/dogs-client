import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <div className="nav-container">
      <NavLink
        className={({ isActive }) => (!isActive && 'disable')}
        to="/create"
      >
        Create dog
      </NavLink>
    </div>
  );
}
