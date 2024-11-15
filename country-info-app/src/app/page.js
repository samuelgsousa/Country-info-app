'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Page = () => {
  const [lista, setLista] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [flagUrl, setFlagUrl] = useState('');


  const PopulationChart = ({ populationData }) => {
    const chartData = {
      labels: populationData.map((pop) => pop.year),  // Anos
      datasets: [
        {
          label: 'População',
          data: populationData.map((pop) => pop.value),  // População
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  
    return <Line data={chartData} />;
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/list')
      .then((response) => response.json())
      .then((data) => setLista(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/flags')
      .then((response) => response.json())
      .then((data) => setFlags(data.data));
  }, []);


  const handleCountryChange = (event) => {
    const selectedCode = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;
    setSelectedCountryCode(selectedCode);
    setSelectedCountryName(selectedName);  // Agora armazenamos o nome do país também
  };

  const handleFetchCountryData = () => {
    // Buscar dados do país usando o countryCode
    fetch(`http://localhost:5000/api/country/${selectedCountryCode}`)
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));

      // Buscar dados de população de todos os países
    fetch('http://localhost:5000/api/population')
      .then((response) => response.json())
      .then((data) => {
        const countryPopulation = data.data.find((item) => item.country === selectedCountryName);
        setPopulationData(countryPopulation ? countryPopulation.populationCounts : []);
      });

        // Buscar dados de bandeira
    fetch('http://localhost:5000/api/flags')
    .then((response) => response.json())
    .then((data) => {
      
      const flag = data.data.find((item) => item.name === selectedCountryName);
      console.log(`flag é: ${flag}`)
      setFlagUrl(flag ? flag.flag : ''); // Adicionando o URL da bandeira ou vazio
    });
  };

  return (
    <div>
      <select value={selectedCountryCode} onChange={handleCountryChange}>
        <option value="">Selecione um país</option>
        {Array.isArray(lista) && lista.map((item) => (
          <option key={item.countryCode} value={item.countryCode}>
            {item.name}
          </option>
        ))}
      </select>
      <button onClick={handleFetchCountryData}>Buscar Dados do País</button>

      {countryInfo && (
          <div>
              <h2>{countryInfo.commonName} ({countryInfo.officialName})</h2>
              <div>
                {flagUrl ? (
                  <img src={flagUrl} alt={`Flag of ${selectedCountryName}`} width={100} style={{ borderColor: 'black', borderWidth: '2px', borderStyle: 'solid' }}/>
                ) : (
                  <p>Flag not available</p>
                )}
              </div>
          <p><strong>Região:</strong> {countryInfo.region}</p>
          <p><strong>Fronteiras:</strong></p>
          <ul>
            {countryInfo.borders && countryInfo.borders.map((border, index) => (
              <li key={index}>{border.commonName}</li>
            ))}
          </ul>
        </div>
      )}

        <div style={{ width: '100vw', height: '400px'}}>
          {populationData && <PopulationChart populationData={populationData} />}
        </div>
    </div>
  );
};

export default Page;
