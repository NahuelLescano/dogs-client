import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemperaments } from '../../redux/action-creators/index';
import validation from './validation';
import './Create.css';

const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function Form() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
    name: '',
    life_span: '',
    image: '',
    temperament: '',
  });

  const [userInputs, setUserInputs] = useState({
    weightMin: '',
    weightMax: '',
    heightMin: '',
    heightMax: '',
    name: '',
    life_span: '',
    image: '',
    temperament: [],
  });

  const [temperSelect, setTemperSelect] = useState([]);

  const allTemperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTemperaments());
    // eslint-disable-next-line
  }, []);

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
    if (
      e.target.value !== 'Choose at least two' &&
      !userInputs.temperament.includes(e.target.value)
    ) {
      setErrors(
        validation({
          ...userInputs,
          temperament: [...userInputs.temperament, e.target.value],
        })
      );

      setUserInputs({
        ...userInputs,
        temperament: [...userInputs.temperament, e.target.value],
      });

      setTemperSelect([...temperSelect, e.target.value]);
    } else {
      alert('It was already selected.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      Object.values(errors).every((error) => error === '') &&
      userInputs.temperament.length >= 2
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
        temperament: userInputs.temperament,
      };

      setUserInputs({
        weightMin: '',
        weightMax: '',
        heightMin: '',
        heightMax: '',
        name: '',
        life_span: '',
        image: '',
        temperament: [],
      });
      try {
        const response = await axios.post(REACT_APP_GET_ALL_DOGS, inputs);
        alert(response?.message || 'Dog was successfully created.');
        navigate('/home');
      } catch (error) {
        alert(
          error.response?.data?.message ||
            'Something went wrong, check your inputs.'
        );
      }
    } else {
      alert('Something went wrong, check your inputs.');
    }
  };

  const handleClick = () => navigate('/home');

  const handleDelete = (e) => {
    const temper = temperSelect.filter((temp) => temp !== e.target.value);
    setTemperSelect(temper);
    setUserInputs({
      ...userInputs,
      temperament: temper,
    });
    setErrors(
      validation({
        ...errors,
        temperament: [...userInputs.temperament, e.target.value],
      })
    );
  };

  console.log(userInputs);
  console.log(temperSelect);
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
          type="number"
          placeholder="Enter the minimum..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.weightMin}</p>
        <label htmlFor="max">Maximum: </label>
        <input
          id="max"
          name="weightMax"
          type="number"
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
          type="number"
          placeholder="Enter the minimum..."
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.heightMin}</p>
        <label htmlFor="max">Maximum: </label>
        <input
          id="max"
          name="heightMax"
          type="number"
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
          type="number"
          placeholder="min - max"
          onChange={handleInputChange}
          className="create-input"
        />
        <p className="danger">{errors.life_span}</p>
        <label htmlFor="temperament">Temperaments: </label>
        <select
          id="temperament"
          name="temperament"
          onChange={handleSelectChange}
          className="create-input"
        >
          <option>Choose at least two</option>
          {allTemperaments &&
            allTemperaments.map((temp) => (
              <option className="create-input" key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            ))}
        </select>
        <div className="temper-selected">
          {temperSelect &&
            temperSelect.map((temp, index) => (
              <button
                key={index}
                value={temp}
                type="button"
                onClick={handleDelete}
                className="button-temper"
              >
                {temp}
              </button>
            ))}
        </div>
        <p className="danger">{errors.temperament}</p>
        <label htmlFor="image">Image: </label>
        <input
          id="image"
          name="image"
          type="url"
          placeholder="https://example.jpg"
          className="create-input"
          onChange={handleInputChange}
        />
        <p className="danger">{errors.image}</p>
        <button className="create-button" type="submit">
          Create dog
        </button>
      </form>
    </div>
  );
}
