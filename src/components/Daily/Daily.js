import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Daily.css';

function Daily({ cityName }) {
  const navigate = useNavigate();
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c3189249f4afdf526538f6f3f81e3750&units=metric`;

  const [cityData, setCityData] = useState({});
  const [weatherData, setWeatherData] = useState({});

  const getWeatherData = () => {
    const data = cityData?.weather;
    if (data) {
      setWeatherData(data[0]);
    }
  };

  const formatDate = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  };

  const date = new Date();

  const getCurrent = async () => {
    try {
      const response = await axios.get(currentURL);
      console.log(response.data);
      if (!response) throw new Error('no response');
      setCityData(response.data);
    } catch (error) {
      if (error.response.status === 404) navigate('/page-not-found');
      console.log(error.message);
      setCityData([]);
    }
  };

  useEffect(() => {
    getCurrent();
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [cityData]);

  return (
    <div className="daily_container clear">
      {cityData?.main?.temp ? (
        <>
          <h1 className="daily_title">{cityData.name}</h1>
          <h3 className="daily_date">{formatDate(date)}</h3>
          <p
            className={`daily_degree ${
              cityData?.main?.temp > 20
                ? 'hot'
                : cityData?.main?.temp < 10
                ? 'cold'
                : 'normal'
            }`}
          >
            {Math.round(cityData?.main?.temp)}°<span>C</span>
          </p>
          <p className="daily_feels">
            Feels like: {Math.round(cityData?.main?.feels_like)}°<span>C</span>
          </p>
          {weatherData.icon && (
            <img
              className="daily_pic"
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="weather icon"
            />
          )}
          <p className="daily_description">{weatherData.description}</p>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Daily;
