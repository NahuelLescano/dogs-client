import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';

export default function Card({ id, name, lifeSpan, temperament, image }) {
  return (
    <div className="dog-card">
      <h2>Name: {name}</h2>
      <h3>Life span: {lifeSpan}</h3>
      <h3>Temperaments: </h3>
      <div className="temper-info">
        {temperament &&
          temperament.map((temp, index) => (
            <option key={index}>{temp.name ? temp.name : temp}</option>
          ))}
      </div>
      <img src={image} alt={name} className="dog-image" />
      <button className="card-button">
        <NavLink
          className={({ isActive }) => !isActive && 'disable-card'}
          to={`/details/${id}`}
        >
          See more
        </NavLink>
      </button>
    </div>
  );
}
