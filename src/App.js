import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Ghotki');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=58552952a15aed95c66e61e7b20710a3`;
// ... (previous code)

const getWeatherWarning = (weatherCode) => {
  const warnings = {
    200: 'Warning: Thunderstorm with light rain',
    201: 'Warning: Thunderstorm with rain',
    202: 'Warning: Thunderstorm with heavy rain',
    210: 'Warning: Light thunderstorm',
    211: 'Warning: Thunderstorm',
    212: 'Warning: Heavy thunderstorm',
    221: 'Warning: Ragged thunderstorm',
    230: 'Warning: Thunderstorm with light drizzle',
    231: 'Warning: Thunderstorm with drizzle',
    232: 'Warning: Thunderstorm with heavy drizzle',

    300: 'Warning: Light intensity drizzle',
    301: 'Warning: Drizzle',
    302: 'Warning: Heavy intensity drizzle',
    310: 'Warning: Light intensity drizzle rain',
    311: 'Warning: Drizzle rain',
    312: 'Warning: Heavy intensity drizzle rain',
    313: 'Warning: Shower rain and drizzle',
    314: 'Warning: Heavy shower rain and drizzle',
    321: 'Warning: Shower drizzle',

    500: 'Warning: Light rain',
    501: 'Warning: Moderate rain',
    502: 'Warning: Heavy intensity rain',
    503: 'Warning: Very heavy rain',
    504: 'Warning: Extreme rain',
    511: 'Warning: Freezing rain',
    520: 'Warning: Light intensity shower rain',
    521: 'Warning: Shower rain',
    522: 'Warning: Heavy intensity shower rain',
    531: 'Warning: Ragged shower rain',

    600: 'Warning: Light snow',
    601: 'Warning: Snow',
    602: 'Warning: Heavy snow',
    611: 'Warning: Sleet',
    612: 'Warning: Light shower sleet',
    613: 'Warning: Shower sleet',
    615: 'Warning: Light rain and snow',
    616: 'Warning: Rain and snow',
    620: 'Warning: Light shower snow',
    621: 'Warning: Shower snow',
    622: 'Warning: Heavy shower snow',
  };

  return warnings[weatherCode] || null;
};



  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('City not found');
        } else {
          setError('No internet access');
        }
      } finally {
        setLoading(false); // Ensure this line runs regardless of success or error
      }
    }
  };
  const weatherWarning = getWeatherWarning(data.weather && data.weather[0]?.id);

  return (
    <div className="app">
      <div className={`overlay ${loading ? 'active' : ''}`}>
        <h1>Loading...</h1>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          onKeyPress={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>

      <div className="container">
        {error && <p className="error">{error}</p>}
        {weatherWarning && <p className="warning">{weatherWarning}</p>}
        {/* Rest of your components */}
        <div className="top">
        <div className="location">
            <p>{data.name ? data.name: null}</p>
        </div>
        <div className="temp">
            <h1>{data.main ? (((data.main.temp) - 32) * 5 / 9).toFixed() : null}°C</h1>
            <div className="weather-icon">
      {data.weather && (
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
      )}
    </div>
          </div>
          
        <div className='description'>
            <p>{ data.weather ? data.weather[0].description: null}</p>
        </div>
      </div>
      <div className="bottom">
        <div className='feels'>
            <p className='bold'>{ data.main?(((data.main.feels_like) - 32) * 5/9).toFixed(): null}°C</p>
            <p>Feels like</p>
        </div>
        <div className='humidity'>
            <p className='bold'> { data.main?data.main.humidity:null}%</p>
             <p >humidity</p>
            
            
        </div>
        <div className='wind'>
            <p className='bold'> { data.wind? data.wind.speed: null}MPH</p>
             <p>Wind Speed</p>
        </div>
      </div>
        
      </div>
    </div>
  );
}

export default App;
