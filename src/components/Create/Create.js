import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/action-creators/index';
import './Create.css';
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
    temperaments: [],
  });

  const allTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  // const [errors, setErrors] = useState({
  //   weightMin: '',
  //   weightMax: '',
  //   heightMin: '',
  //   heightMax: '',
  //   name: '',
  //   lifeSpan: '',
  //   image: '',
  //   temperaments: '',
  // });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (
      name === 'weightMin' ||
      name === 'weightMax' ||
      name === 'heightMax' ||
      name === 'heightMin'
    ) {
      // setErrors(
      //   validation({
      //     ...measure,
      //     [name]: value,
      //   })
      // );

      setMeasure({
        ...measure,
        [name]: value,
      });
    } else {
      // setErrors(
      //   validation({
      //     ...input,
      //     [name]: value,
      //   })
      // );

      if (name !== 'temperaments') {
        setInput({
          ...input,
          [name]: value,
        });
      } else {
        setInput({
          ...input,
          temperaments: [...input.temperaments, parseInt(value)],
        });
      }
    }
  };

  console.log(input.temperaments);

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

    try {
      const response = await axios.post(REACT_APP_GET_ALL_DOGS, input);
      alert(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  return (
    <div className="create-container">
      <button className="create-button" onClick={() => navigate('/home')}>
        Atrás
      </button>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Crear perro</h1>
        <label>Peso (kg): </label>
        <label htmlFor="min">Mínimo: </label>
        <input
          id="min"
          name="weightMin"
          placeholder="Ingrese el peso min..."
          onChange={handleInputChange}
          className="create-input"
        />
        <label htmlFor="max">Máximo: </label>
        <input
          id="max"
          name="weightMax"
          placeholder="Ingrese el peso max..."
          onChange={handleInputChange}
          className="create-input"
        />
        <br />
        <label htmlFor="height">Altura (cm): </label>
        <label htmlFor="min">Mínimo: </label>
        <input
          id="min"
          name="heightMin"
          placeholder="Ingrese la altura min..."
          onChange={handleInputChange}
          className="create-input"
        />
        <label htmlFor="max">Máximo: </label>
        <input
          id="max"
          name="heightMax"
          placeholder="Ingrese el altura max..."
          onChange={handleInputChange}
          className="create-input"
        />
        <br />
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
          name="name"
          placeholder="Ingrese el nombre..."
          onChange={handleInputChange}
          className="create-input"
        />
        <br />
        <label htmlFor="life_span">Tiempo de vida: </label>
        <input
          id="life_span"
          name="life_span"
          placeholder="min - max años"
          onChange={handleInputChange}
          className="create-input"
        />
        <br />
        <label htmlFor="temperaments">Temperamento: </label>
        <select
          id="temperaments"
          name="temperaments"
          onChange={handleInputChange}
          className="create-input"
        >
          <option>Seleccione un temperamento</option>
          {allTemperaments &&
            allTemperaments.map((temp) => (
              <option className="create-input" key={temp.id} value={temp.id}>
                {temp.name}
              </option>
            ))}
        </select>
        <br />
        <label htmlFor="image">Imagen: </label>
        <input
          id="image"
          name="image"
          type="url"
          placeholder="URL de la imagen"
          className="create-input"
          onChange={handleInputChange}
        />
        <button className="create-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
