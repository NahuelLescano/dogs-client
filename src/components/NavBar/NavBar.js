import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterDogs, orderDogs } from '../../redux/action-creators';
import SearchBar from '../SearchBar/SearchBar';
import './NavBar.css';

export default function NavBar({ setPage }) {
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
    setPage(1);
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
      <select className="nav-select" name="temperament" onChange={handleFilter}>
        <option value="reset">All</option>
        {allTemperaments &&
          allTemperaments.map((temp) => (
            <option key={temp.id} value={temp.name}>
              {temp.name}
            </option>
          ))}
      </select>

      <select className="nav-select" name="create" onChange={handleFilter}>
        <option value="reset">All</option>
        <option value="api">API</option>
        <option value="database">Database</option>
      </select>

      <select className="nav-select" onChange={handleOrder}>
        <option value="reset">All</option>
        <option value="ascending weight">Ascending by weight</option>
        <option value="descending weight">Descending by weight</option>
        <option value="ascending breed">Ascending by breed</option>
        <option value="descending breed">Descending by breed</option>
      </select>
      <button
        className="nav-button"
        name="reset"
        value="reset"
        onClick={handleFilter}
      >
        Go back
      </button>
      <SearchBar setPage={setPage} />
    </div>
  );
}
