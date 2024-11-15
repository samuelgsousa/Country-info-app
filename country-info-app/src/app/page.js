'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import React from 'react';

const Page = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/list`)
      .then((response) => response.json())
      .then((data) => setLista(data));
  }, []);

  return (
    <div>
      <p className="wellcomeText">
        Select one Country to see details about it!
      </p>

      <ul className={styles.list}>
        {Array.isArray(lista) &&
          lista.map((item) => (
            <li
              key={item.countryCode}
              onClick={() =>
                (window.location.href = `/country/${item.countryCode}`)
              }
              className={styles.listItem}
            >
              <Link href={`/country/${item.countryCode}`}>{item.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
