import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllDogs,
  getAllTemperaments,
} from '../../redux/action-creators/index';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import './Home.css';
import Loading from '../Loading/Loading';
import Paginate from '../Paginate/Paginate';

export default function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.allDogs);
  const [page, setPage] = useState(1);
  //variables para calcular la cantidad de paginas
  const dogsPage = 8;
  const max = Math.ceil(allDogs?.length / dogsPage);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      await dispatch(getAllDogs());
      await dispatch(getAllTemperaments());
      setIsLoading(false);
    };
    fetchDogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="cards-container">
      <NavBar />
      <div className="home-container">
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
