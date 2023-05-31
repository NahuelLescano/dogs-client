import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchDog } from '../../redux/action-creators';
import axios from 'axios';

const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function SearchBar() {
  const [character, setCharacter] = useState('');

  const onSearch = async (name) => {
    try {
      const response = await axios.get(
        `${REACT_APP_GET_ALL_DOGS}/name?name=${name}`
      );
      setCharacter(response.data);
    } catch ({ message }) {
      console.log(message);
    }
  };

  console.log(character);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCharacter(e.target.value);
    dispatch(searchDog(character));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(character);
    setCharacter('');
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
