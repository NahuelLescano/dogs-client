import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { filteredDogs } from '../../redux/action-creators';

export default function NavBar() {
  const allTemperaments = useSelector((state) => state.temperaments);
  // eslint-disable-next-line
  const [dogFiltered, setDogFitered] = useState();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(filteredDogs(e.target.value));
  };

  return (
    <div className="nav-container">
      <NavLink
        className={({ isActive }) => !isActive && 'disable'}
        to="/create"
      >
        Create dog
      </NavLink>
      <select name="temperament" onChange={handleInputChange}>
        <option>Seleccione un temperamento</option>
        {allTemperaments &&
          allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.id}>
              {temp.name}
            </option>
          ))}
      </select>

      <select name="create" onChange={handleInputChange}>
        <option>api</option>
        <option>base de dato</option>
      </select>

      <select>
        <option>Ordenar</option>
      </select>
    </div>
  );
}
