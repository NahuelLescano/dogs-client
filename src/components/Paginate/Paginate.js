import React from 'react';

export default function Paginate({ max, page, setPage }) {
  const pagination = [];
  for (let i = 1; i <= max; i++) {
    pagination.push(i);
  }

  const handleClickAvanzar = (e) => {
    const { name } = e.target;
    if (name === 'avanzar') {
      page + 1 > max ? setPage(1) : setPage(page + 1);
    }
    if (name === 'retroceder') {
      page === 1 ? setPage(max) : setPage(page - 1);
    }
  };

  const handleClick = (e) => {
    setPage(parseInt(e.target.value));
  };

  return (
    <div>
      <button name="retroceder" onClick={handleClickAvanzar}>
        Retroceder
      </button>
      {pagination.map((pag, index) => (
        <button key={index} value={pag} name={pag} onClick={handleClick}>
          {pag}
        </button>
      ))}
      <button name="avanzar" onClick={handleClickAvanzar}>
        Avanzar
      </button>
    </div>
  );
}
