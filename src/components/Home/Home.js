import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Loading from '../Loading/Loading';
import Paginate from '../Paginate/Paginate';
import {
  getAllDogs,
  getAllTemperaments,
  setError,
} from '../../redux/action-creators/index';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.allDogs);

  const [page, setPage] = useState(1);
  // Variables to calculate the number of pages.
  const dogsPage = 8;
  const max = Math.ceil(allDogs?.length / dogsPage);

  const [isLoading, setIsLoading] = useState(true);

  const error = useSelector((state) => state.error);

  useEffect(() => {
    const fetchDogs = async () => {
      await dispatch(getAllDogs());
      await dispatch(getAllTemperaments());
      setIsLoading(false);
    };
    fetchDogs();
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    dispatch(setError());
  };

  // allDogs.map((dog) => console.log(dog.temperament));
  return (
    <div className="home-container">
      <div className={error ? 'error' : 'no-error'}>
        <h1>Dogs not found</h1>
        <button className="error-button" onClick={handleClick}>
          X
        </button>
      </div>

      {!isLoading && <NavBar setPage={setPage} />}

      <div className="cards-container">
        {!isLoading ? (
          allDogs &&
          allDogs
            .slice((page - 1) * dogsPage, (page - 1) * dogsPage + dogsPage)
            .map((dog) => (
              <div key={dog.id}>
                <Card
                  id={dog.id}
                  name={dog.name}
                  lifeSpan={dog.life_span}
                  temperament={dog.temperament}
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
      <div className={!isLoading ? 'visible' : 'no-visible'}>
        <Paginate max={max} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
