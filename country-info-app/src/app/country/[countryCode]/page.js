'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './page.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CountryPage = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [flagUrl, setFlagUrl] = useState('');

  const PopulationChart = ({ populationData }) => {
    const chartData = {
      labels: populationData.map((pop) => pop.year),
      datasets: [
        {
          label: 'Population',
          data: populationData.map((pop) => pop.value),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    return <Line data={chartData} />;
  };

  useEffect(() => {
    if (!countryCode) return;

    // Buscar dados do país
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/country/${countryCode}`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);

        // Agora que temos o nome do país, buscamos a população e a bandeira
        const countryName = data.commonName;

        // Buscar dados de população pelo nome do país
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/population`)
          .then((response) => response.json())
          .then((data) => {
            const countryPopulation = data.data.find(
              (item) => item.country === countryName
            );
            setPopulationData(
              countryPopulation ? countryPopulation.populationCounts : []
            );
          });

        // Buscar dados de bandeira pelo nome do país
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/flags`)
          .then((response) => response.json())
          .then((data) => {
            const flag = data.data.find((item) => item.name === countryName);
            setFlagUrl(flag ? flag.flag : '');
          });
      });
  }, [countryCode]);

  if (!countryCode) return <div>Carregando...</div>;

  return (
    <div className='content'>
      {countryInfo && (
        <div>
          <h2>
            {countryInfo.commonName} ({countryInfo.officialName})
          </h2>
          <div>
            {flagUrl ? (
              <img
                src={flagUrl}
                alt={`Flag of ${countryInfo.commonName}`}
                width={100}
                style={{
                  borderColor: 'black',
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
                className='flag'
              />
            ) : (
              <p>Flag not available</p>
            )}
          </div>

<div className="countryBasicInfo">
  
  <p>
    <strong>Region:</strong> {countryInfo.region}
  </p>
  <div className='countryBorders'>
  <p>
    <strong>Borders:</strong>
  </p>
  <ul>
      {countryInfo.borders &&
        countryInfo.borders.map((border, index) => (
          <li key={index}>{border.commonName}</li>
        ))}
  </ul>
  </div>
</div>

        </div>
      )}

      <div style={{ width: '100vw', height: '400px' }} className='chartContent'>
        {populationData && <PopulationChart populationData={populationData} />}
      </div>
    </div>
  );
};

CountryPage.propTypes = {
  populationData: PropTypes.array.isRequired,
};

export default CountryPage;
