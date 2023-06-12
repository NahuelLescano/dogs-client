import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import './Details.css';

const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${REACT_APP_GET_ALL_DOGS}/id/${id}`)
      .then((response) => setDog(response.data))
      .then(() => setIsLoading(false));
  }, [id]);

  const handleClick = () => navigate('/home');

  return (
    <div>
      {!isLoading ? (
        <div className="container-detail">
          <div className="detail-group">
            <h1>Dog details</h1>
            <img src={dog.image} alt={dog.name} className="image-detail" />
            <h2>ID: {dog.id}</h2>
            <h2>Name: {dog.name}</h2>
            <h2>Height: {dog.height?.metric} cm</h2>
            <h2>Weight: {dog.weight?.metric} kg</h2>
            <h2>Life span: {dog.life_span}</h2>
            <h2>Temperaments: </h2>
            <div className="detail-temper">
              {dog.temperament
                ? dog.temperament
                    .split(', ')
                    .map((temp, index) => <option key={index}>{temp}</option>)
                : dog.Temperaments.map((temp) => (
                    <h3 key={temp.id}>{temp.name}</h3>
                  ))}
            </div>
          </div>
          <button className="button-detail" onClick={handleClick}>
            Go back
          </button>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}
