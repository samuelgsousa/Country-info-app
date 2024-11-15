'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

const Page = () => {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/list`)
      .then((response) => response.json())
      .then((data) => setLista(data));
  }, []);

  return (
    <div>
      <h1>Country List</h1>
      <ul className={styles.list}>
        {Array.isArray(lista) && lista.map((item) => (
          <li key={item.countryCode}>
            <Link href={`/country/${item.countryCode}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
