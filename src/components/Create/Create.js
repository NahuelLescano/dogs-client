import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Create.css';

const { REACT_APP_GET_TEMPERAMENTS } = process.env;

export default function Form() {
  const [input, setInput] = useState({
    weight: '',
    height: '',
    name: '',
    lifeSpan: '',
    image: '',
    temperament: '',
  });

  const [temperaments, setTemperaments] = useState();

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
  };

  useEffect(() => {
    axios
      .get(REACT_APP_GET_TEMPERAMENTS)
      .then((response) => setTemperaments(response.data));
  }, []);

  return (
    <div>
      <h1>Crear perro</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="weight">Peso: </label>
        <input
          id="weight"
          name="weight"
          placeholder="Ingrese el peso"
          onChange={handleChange}
        />
        <label htmlFor="height">Altura: </label>
        <input
          id="height"
          name="height"
          placeholder="Ingrese la altura"
          onChange={handleChange}
        />
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
          name="name"
          placeholder="Ingrese el nombre"
          onChange={handleChange}
        />
        <label htmlFor="lifeSpan">Tiempo de vida: </label>
        <input
          id="lifeSpan"
          name="lifeSpan"
          placeholder="Ingrese el tiempo de vida"
          onChange={handleChange}
        />
        <label htmlFor="temperament">Temperamento: </label>
        <select id="temperament" name="temperament" onChange={handleChange}>
          <option>Seleccione un temperamento</option>
          {temperaments &&
            temperaments.map((temp) => (
              <option key={temp.id}>{temp.name}</option>
            ))}
        </select>
        <label htmlFor="image">Imagen: </label>
        <input
          id="image"
          name="image"
          placeholder="Ingrese la url de la imagen"
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
