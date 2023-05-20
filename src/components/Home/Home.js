import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs } from '../../redux/action-creators/index';
import Card from '../Card/Card';

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.allDogs);

  useEffect(() => {
    dispatch(getAllDogs());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      Home
      {allDogs &&
        allDogs.map((dog) => (
          <div key={dog.id}>
            <Card id={dog.id} name={dog.name} lifeSpan={dog.life_span} image={dog.image?.url} />
          </div>
        ))}
    </div>
  );
}
