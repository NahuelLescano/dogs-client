import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/action-creators/index';
import validation from './validation';
import './Create.css';

const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function Form() {
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

  const [userInputs, setUserInputs] = useState({
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
    name: '',
    life_span: '',
    image: '',
    temperaments: [],
  });

  const allTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTemperaments());
    // eslint-disable-next-line
  }, []);

  const [temperSelect, setTemperSelect] = useState([]);

  const handleInputChange = (e) => {
    setErrors(
      validation({
        ...userInputs,
        [e.target.name]: e.target.value,
      })
    );

    setUserInputs({
      ...userInputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setErrors(
      validation({
        ...userInputs,
        temperaments: e.target.value,
      })
    );

    setUserInputs({
      ...userInputs,
      temperaments: [...userInputs.temperaments, e.target.value],
    });

    const temper = allTemperaments.filter((temp) =>
      temp.id.toString().includes(e.target.value.toString())
    );
    setTemperSelect([...temperSelect, temper.find((temp) => temp.name)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(errors).every((error) => error === '') &&
      userInputs.temperaments.length >= 2
    ) {
      const inputs = {
        image: userInputs.image,
        name: userInputs.name,
        weight: {
          metric: `${userInputs.weightMin} - ${userInputs.weightMax}`,
        },
        height: {
          metric: `${userInputs.heightMin} - ${userInputs.heightMax}`,
        },
        life_span: `${userInputs.life_span} years`,
        temperaments: userInputs.temperaments,
      };

      setErrors(
        validation({
          weightMin: '',
          weightMax: '',
          heightMin: '',
          heightMax: '',
          name: '',
          life_span: '',
          image: '',
          temperaments: '',
        })
      );

      try {
        await axios.post(REACT_APP_GET_ALL_DOGS, inputs);
        alert('Dog was successfully created');
      } catch (error) {
        alert('Something went wrong, check your inputs.');
      }
    }
  };

  const navigate = useNavigate();
  const handleClick = () => navigate('/home');

  return (
    <div className="create-container">
      <button className="back-button" onClick={handleClick}>
        Go back
      </button>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create your dog</h1>
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
          onChange={handleSelectChange}
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
        <div>
          {temperSelect &&
            temperSelect.map((temp) => (
              <p className="temper-selected" key={temp.id}>
                {temp.name}
              </p>
            ))}
        </div>
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
