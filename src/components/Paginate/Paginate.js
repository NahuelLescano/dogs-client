import React from 'react';
import './Paginate.css';

export default function Paginate({ max, page, setPage }) {
  const pagination = [];
  for (let i = 1; i <= max; i++) {
    pagination.push(i);
  }

  const handleClickMove = (e) => {
    const { name } = e.target;
    if (name === 'next') {
      page + 1 > max ? setPage(1) : setPage(page + 1);
    }
    if (name === 'previous') {
      page === 1 ? setPage(max) : setPage(page - 1);
    }
  };

  const handleClick = (e) => {
    setPage(parseInt(e.target.value));
  };

  return (
    <div className="pag-container">
      <button
        className={page === 1 ? 'disable-prev' : 'pag-button'}
        name="previous"
        onClick={handleClickMove}
      >
        Previous
      </button>
      {pagination.map((pag, index) => (
        <button
          className={page === pag ? 'active-button' : 'disable-button'}
          key={index}
          value={pag}
          name={pag}
          onClick={handleClick}
        >
          {pag}
        </button>
      ))}
      <button
        className={page === max ? 'disable-next' : 'pag-button'}
        name="next"
        onClick={handleClickMove}
      >
        Next
      </button>
    </div>
  );
}
