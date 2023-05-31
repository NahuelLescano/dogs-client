import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterDogs, orderDogs } from '../../redux/action-creators';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';

export default function NavBar() {
  const [order, setOrder] = useState(false);
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

  const handleOrder = (e) => {
    dispatch(orderDogs(e.target.value));
    setOrder(!order);
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
        <option value="api">API</option>
        <option value="base de datos">Base de dato</option>
      </select>

      <select onChange={handleOrder}>
        <option value="ascending weight">Ascendente por peso</option>
        <option value="descending weght">Descendente por peso</option>
        <option value="ascending breed">Ascendente por raza</option>
        <option value="descending breed">Descendente por raza</option>
      </select>

      <SearchBar />
    </div>
  );
}
