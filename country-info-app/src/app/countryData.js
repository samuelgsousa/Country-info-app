'use client';

import { useEffect, useState } from 'react';
import React from 'react';

const CountryData = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/list')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLista(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {Array.isArray(lista) &&
          lista.map((item, index) => (
            <li key={index}>{item.name}</li> // Aqui você pode acessar a propriedade 'name' de cada objeto.
          ))}
      </ul>
    </div>
  );
};

export default CountryData;
