import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const { REACT_APP_GET_ALL_DOGS } = process.env;

export default function Details() {
  const { id } = useParams();
  const [dogs, setDogs] = useState();

  useEffect(() => {
    axios
      .get(`${REACT_APP_GET_ALL_DOGS}/id/${id}`)
      .then((response) => setDogs(response.data));
  }, [id]);

  return (
    <div>
      <h1>Detalles del perro</h1>
      {dogs &&
        dogs.map((dog) => (
          <div key={dog.id}>
            <img src={dog.image?.url} alt={dog.name} />
            <h2>{dog.id}</h2>
            <h2>{dog.name}</h2>
            <h2>{dog.height?.metric}</h2>
            <h2>{dog.weight?.metric}</h2>
            <h2>{dog.life_span}</h2>
          </div>
        ))}
    </div>
  );
}
