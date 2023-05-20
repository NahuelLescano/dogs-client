import React from 'react';
import {Link} from 'react-router-dom'
import './Card.css';

export default function Card({ id, name, lifeSpan, image }) {
  return (
    <div className="dog-card">
      <h2>{name}</h2>
      <h3>{lifeSpan}</h3>
      <img src={image} alt={name} className="dog-image" />
      <button>
        <Link to={`/details/${id}`}>Ver más</Link>
      </button>
    </div>
  );
}
