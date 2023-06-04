import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDog } from '../../redux/action-creators';
import './SearchBar.css';

export default function SearchBar({ setPage }) {
  const [character, setCharacter] = useState('');

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCharacter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setCharacter('');
    dispatch(searchDog(character));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          value={character}
          onChange={handleChange}
          type="search"
          placeholder="Search by name..."
          className="search-input"
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
