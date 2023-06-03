import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/action-creators/index';
import validation from './validation';
import './Create.css';

const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function Form() {
  const [measure, setMeasure] = useState({
    weightMin: { booleano: false, value: '' },
    weightMax: { booleano: false, value: '' },
    heightMin: { booleano: false, value: '' },
    heightMax: { booleano: false, value: '' },
    name: { booleano: false, value: '' },
    life_span: { booleano: false, value: '' },
    image: { booleano: false, value: '' },
    temperaments: { booleano: false, value: [] },
  });

  // eslint-disable-next-line
  const [errors, setErrors] = useState({
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
    name: '',
    life_span: '',
    image: '',
    temperaments: 'Selecciona al menos 2 temperamentos',
  });

  let input = {
    weight: {},
    height: {},
    name: '',
    life_span: '',
    image: '',
    temperament: [],
  };

  const allTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    validation({ name, value, errors, setErrors, measure, setMeasure });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      measure.weightMin.booleano &&
      measure.weightMax.booleano &&
      measure.heightMin.booleano &&
      measure.heightMax.booleano &&
      measure.name.booleano &&
      measure.life_span.booleano &&
      measure.image.booleano &&
      measure.temperaments.booleano
    ) {
      console.log('complete');
      input.weight = {
        metric: `${measure.weightMin.value} - ${measure.weightMax.value}`,
      };

      input.height = {
        metric: `${measure.heightMin.value} - ${measure.heightMax.value}`,
      };
      input.name = measure.name.value;
      input.life_span = measure.life_span.value;
      input.temperament = measure.temperaments.value;
      input.image = measure.image.value;
      console.log(input);
    } else {
      console.log('not complete');
    }

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
        <p>{errors.weightMin}</p>
        <label htmlFor="max">Máximo: </label>
        <input
          id="max"
          name="weightMax"
          placeholder="Ingrese el peso max..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p>{errors.weightMax}</p>
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
        <p>{errors.heightMin}</p>
        <label htmlFor="max">Máximo: </label>
        <input
          id="max"
          name="heightMax"
          placeholder="Ingrese el altura max..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p>{errors.heightMax}</p>
        <br />
        <label htmlFor="name">Nombre: </label>
        <input
          id="name"
          name="name"
          placeholder="Ingrese el nombre..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p>{errors.name}</p>
        <br />
        <label htmlFor="life_span">Tiempo de vida: </label>
        <input
          id="life_span"
          name="life_span"
          placeholder="min - max años"
          onChange={handleInputChange}
          className="create-input"
        />
        <p>{errors.life_span}</p>
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
        <p>{errors.temperaments}</p>
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
        <p>{errors.image}</p>
        <button className="create-button" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
