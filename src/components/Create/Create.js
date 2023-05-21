import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Create.css';
import validation from './validation';

const { REACT_APP_GET_TEMPERAMENTS } = process.env;

// Todavía falta que se rendericen los errores.
export default function Form() {
  const [input, setInput] = useState({
    weight: {
      min: 0,
      max: 0,
    },
    height: {
      min: 0,
      max: 0,
    },
    name: '',
    lifeSpan: '',
    image: '',
    temperament: '',
  });

  const [temperaments, setTemperaments] = useState();

  const [errors, setErrors] = useState({
    weight: '',
    height: '',
    name: '',
    lifeSpan: '',
    image: '',
    temperament: '',
  });

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !errors.weight &&
      !errors.height &&
      !errors.name &&
      !errors.lifeSpan &&
      !errors.image &&
      !errors.temperament
    ) {
      setErrors(
        validation({
          weight: '',
          height: '',
          name: '',
          lifeSpan: '',
          image: '',
          temperament: '',
        })
      );
    }
  };

  useEffect(() => {
    axios
      .get(REACT_APP_GET_TEMPERAMENTS)
      .then((response) => setTemperaments(response.data));
  }, []);

  return (
    <div>
      <button>
        <Link to="/home">Atras</Link>
      </button>
      <h1>Crear perro</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="minMax">
          <label>Peso (cm): </label>
          <label htmlFor="min">Mínimo: </label>
          <input id="min" name="min" placeholder="Ingrese el peso min..." />
          <label htmlFor="max">Máximo: </label>
          <input
            id="max"
            name="max"
            placeholder="Ingrese el peso max..."
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="height">Altura: </label>
        <input
          id="height"
          name="height"
          placeholder="Ingrese la altura"
          onChange={handleInputChange}
        />
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
          name="name"
          placeholder="Ingrese el nombre"
          onChange={handleInputChange}
        />
        <label htmlFor="lifeSpan">Tiempo de vida: </label>
        <input
          id="lifeSpan"
          name="lifeSpan"
          placeholder="Ingrese el tiempo de vida"
          onChange={handleInputChange}
        />
        <label htmlFor="temperament">Temperamento: </label>
        <select
          id="temperament"
          name="temperament"
          onChange={handleInputChange}
        >
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
          onChange={handleInputChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
