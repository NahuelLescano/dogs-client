import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Create.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/action-creators/index';
// import validation from './validation';

const { REACT_APP_GET_ALL_DOGS } = process.env;

// Todavía falta que se rendericen los errores.
export default function Form() {
  const [measure, setMeasure] = useState({
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
  });

  const [input, setInput] = useState({
    weight: {},
    height: {},
    name: '',
    life_span: '',
    image: '',
    temperament: '',
  });

  const allTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  // const [errors, setErrors] = useState({
  //   weight: '',
  //   height: '',
  //   name: '',
  //   lifeSpan: '',
  //   image: '',
  //   temperaments: '',
  // });

  const handleInputChange = (event) => {
    const name = event.target.name;
    if (
      name === 'weightMin' ||
      name === 'weightMax' ||
      name === 'heightMax' ||
      name === 'heightMin'
    ) {
      setMeasure({
        ...measure,
        [event.target.name]: event.target.value,
      });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
    // setErrors(
    //   validation({
    //     ...input,
    //     [event.target.name]: event.target.value,
    //   })
    // );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (
    //   !errors.weight &&
    //   !errors.height &&
    //   !errors.name &&
    //   !errors.lifeSpan &&
    //   !errors.image &&
    //   !errors.temperament
    // ) {
    //   setErrors(
    //     validation({
    //       weight: '',
    //       height: '',
    //       name: '',
    //       lifeSpan: '',
    //       image: '',
    //       temperament: '',
    //     })
    //   );
    // }
    input.weight = {
      metric: `${measure.weightMin} - ${measure.weightMax}`,
    };

    input.height = {
      metric: `${measure.heightMin} - ${measure.heightMax}`,
    };

    input.temperament = parseInt(input.temperament);

    try {
      const response = await axios.post(REACT_APP_GET_ALL_DOGS, input);
      console.log(response);
      alert('Perro creado.');
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
    // eslint-disable-next-line
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
          <input
            id="min"
            name="weightMin"
            placeholder="Ingrese el peso min..."
            onChange={handleInputChange}
          />
          <label htmlFor="max">Máximo: </label>
          <input
            id="max"
            name="weightMax"
            placeholder="Ingrese el peso max..."
            onChange={handleInputChange}
          />
        </div>
        <br />
        <label htmlFor="height">Altura: </label>
        <label htmlFor="min">Mínimo: </label>
        <input
          id="min"
          name="heightMin"
          placeholder="Ingrese la altura min..."
          onChange={handleInputChange}
        />
        <label htmlFor="max">Máximo: </label>
        <input
          id="max"
          name="heightMax"
          placeholder="Ingrese el peso max..."
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
          name="name"
          placeholder="Ingrese el nombre"
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="life_span">Tiempo de vida: </label>
        <input
          id="life_span"
          name="life_span"
          placeholder="Ingrese el tiempo de vida"
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="temperament">Temperamento: </label>
        <select
          id="temperament"
          name="temperament"
          onChange={handleInputChange}
        >
          <option>Seleccione un temperamento</option>
          {allTemperaments &&
            allTemperaments.map((temp) => (
              <option key={temp.id} value={temp.id}>
                {temp.name}
              </option>
            ))}
        </select>
        <br />
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
