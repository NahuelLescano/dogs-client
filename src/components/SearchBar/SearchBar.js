import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDog } from '../../redux/action-creators';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={character}
          onChange={handleChange}
          type="search"
          placeholder="Buscar perro"
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}
