import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterDogs } from '../../redux/action-creators';

export default function NavBar() {
  const allTemperaments = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch(
      filterDogs({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <div className="nav-container">
      <NavLink
        className={({ isActive }) => !isActive && 'disable'}
        to="/create"
      >
        Create dog
      </NavLink>
      <select name="temperament" onChange={handleFilter}>
        <option value="reset">Todos</option>
        {allTemperaments &&
          allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
      </select>

      <select name="create" onChange={handleFilter}>
        <option value="api">api</option>
        <option value="base de datos">base de dato</option>
      </select>

      <select>
        <option>Ordenar</option>
      </select>
    </div>
  );
}
