import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <h1>Bienvenido a la página de perros</h1>
      <button>
        <Link to="/home">Ingresar</Link>
      </button>
    </div>
  );
}
