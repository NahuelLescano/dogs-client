import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <Link to="/create">Crear perrito</Link>
    </div>
  );
}
