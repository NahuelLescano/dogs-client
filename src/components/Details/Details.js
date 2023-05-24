import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function Details() {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${REACT_APP_GET_ALL_DOGS}/id/${id}`)
      .then((response) => setDog(response.data))
      .then(() => setIsLoading(false));
  }, [id]);

  return (
    <div>
      {!isLoading ? (
        <div>
          <h1>Dog details</h1>
          <img src={dog.image} alt={dog.name} />
          <h2>ID: {dog.id}</h2>
          <h2>Name: {dog.name}</h2>
          <h2>Height: {dog.height?.metric}</h2>
          <h2>Weight: {dog.weight?.metric}</h2>
          <h2>Life span: {dog.life_span}</h2>
          <button>
            <Link to="/home">Go back</Link>
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
