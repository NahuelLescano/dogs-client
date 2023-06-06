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
    weightMin: { boolean: false, value: '' },
    weightMax: { boolean: false, value: '' },
    heightMin: { boolean: false, value: '' },
    heightMax: { boolean: false, value: '' },
    name: { boolean: false, value: '' },
    life_span: { boolean: false, value: '' },
    image: { boolean: false, value: '' },
    temperaments: { boolean: false, value: [] },
  });

  const [errors, setErrors] = useState({
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
    name: '',
    life_span: '',
    image: '',
    temperaments: '',
  });

  const input = {
    weight: {},
    height: {},
    name: '',
    life_span: '',
    image: '',
    temperament: [],
  };

  const allTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    validation({ name, value, errors, setErrors, measure, setMeasure });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      measure.weightMin.boolean &&
      measure.weightMax.boolean &&
      measure.heightMin.boolean &&
      measure.heightMax.boolean &&
      measure.name.boolean &&
      measure.life_span.boolean &&
      measure.image.boolean &&
      measure.temperaments.boolean
    ) {
      input.weight = {
        metric: `${measure.weightMin.value} - ${measure.weightMax.value}`,
      };

      input.height = {
        metric: `${measure.heightMin.value} - ${measure.heightMax.value}`,
      };
      input.name = measure.name.value;
      input.life_span = `${measure.life_span.value} years`;
      input.temperament = measure.temperaments.value;
      input.image = measure.image.value;
    }

    try {
      await axios.post(REACT_APP_GET_ALL_DOGS, input);
      alert('Dog was successfully created.');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    dispatch(getAllTemperaments());
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const handleClick = () => navigate('/home');
  return (
    <div className="create-container">
      <button className="back-button" onClick={handleClick}>
        Go back
      </button>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create a dog</h1>
        <label>Weight (kg): </label>
        <label htmlFor="min">Minimum: </label>
        <input
          id="min"
          name="weightMin"
          placeholder="Enter the minimum..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.weightMin}</p>
        <label htmlFor="max">Maximum: </label>
        <input
          id="max"
          name="weightMax"
          placeholder="Enter the maximum..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.weightMax}</p>
        <label htmlFor="height">Height (cm): </label>
        <label htmlFor="min">Minimum: </label>
        <input
          id="min"
          name="heightMin"
          placeholder="Enter the minimum..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.heightMin}</p>
        <label htmlFor="max">Maximum: </label>
        <input
          id="max"
          name="heightMax"
          placeholder="Enter the maximum..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.heightMax}</p>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          name="name"
          placeholder="Enter the name..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.name}</p>
        <label htmlFor="life_span">Life span: </label>
        <input
          id="life_span"
          name="life_span"
          placeholder="min - max"
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.life_span}</p>
        <label htmlFor="temperaments">Temperaments: </label>
        <select
          id="temperaments"
          name="temperaments"
          onChange={handleInputChange}
          className="create-input"
        >
          <option>Choose at least two</option>
          {allTemperaments &&
            allTemperaments.map((temp) => (
              <option className="create-input" key={temp.id} value={temp.id}>
                {temp.name}
              </option>
            ))}
        </select>
        {measure.temperaments.value &&
          measure.temperaments.value.map((temper) => (
            <div key={temper.id}>
              {
                allTemperaments.find((temp) => temp.id === parseInt(temper))
                  .name
              }
            </div>
          ))}
        <p className="danger">{errors.temperaments}</p>
        <label htmlFor="image">Image: </label>
        <input
          id="image"
          name="image"
          type="url"
          placeholder="Enter the URL..."
          className="create-input"
          onChange={handleInputChange}
        />
        <p className="danger">{errors.image}</p>
        <button className="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
