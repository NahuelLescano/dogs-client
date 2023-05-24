import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDogs } from '../../redux/action-creators/index';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Loading from '../Loading/Loading';

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.allDogs);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      await dispatch(getAllDogs());
      setIsLoading(false);
    };
    fetchDogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="cards-container">
      <NavBar />
      {!isLoading ? (
        allDogs &&
        allDogs.map((dog) => (
          <div key={dog.id}>
            <Card
              id={dog.id}
              name={dog.name}
              lifeSpan={dog.life_span}
              image={dog.image}
            />
          </div>
        ))
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}
