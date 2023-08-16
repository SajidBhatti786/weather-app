import React, { useEffect,useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const[data, setData] = useState({})
  const [location, setLocation] = useState('Ghotki');
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=58552952a15aed95c66e61e7b20710a3`
  const searchLocation = (event) => {
    if (event.key == 'Enter') {
      setLoading(true);
      axios.get(url)
        .then((response) => {
          if (response.status == 200) {
            setError(null)
            setData(response.data);
            console.log(response);
          }
          
          
        })
        .catch((error) => { 
          if (error.response.status == 404)
          {
            console.log(error)
          alert("no city found with this name!!")
            
          }
          else {
            alert("No internet access!")
          }
          
        })
    }
    setLoading(false);
  }
  return (
    
    <div className='app'>
       <div className={`overlay ${loading ? 'active' : ''}`}>
        <h1>Loading...</h1>
      </div>
      <div className='search'>
        <input
          type='text'
          placeholder='Enter location'
          onKeyPress={searchLocation}
          onChange={(event) => setLocation(event.target.value)}

        />
      </div>
      <div className="container">
        {error && <p className="error">{error}</p>}
      <div className="top">
        <div className="location">
            <p>{data.name ? data.name: null}</p>
        </div>
        <div className="temp">
            <h1>{ data.main ? (((data.main.temp) - 32) * 5/9).toFixed(): null}°C</h1>
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
            <p className='bold'> { data.wind? data.wind.speed: null}Km/h</p>
             <p>Wind Speed</p>
        </div>
      </div>
      </div>
      </div>
  );
}

export default App;
