import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css';
import Daily from '../../components/Daily/Daily';
import Forecast from '../../components/Forecast/Forecast';
import MinMaxChart from '../../components/MinMaxChart/MinMaxChart';
import axios from 'axios';
import { useState } from 'react';
import './CityDetails.css';

function CityDetails() {
  const [forecastData, setForecastData] = useState([]);
  const FORECAST_DAYS = 16;
  const { cityName } = useParams();
  const navigate = useNavigate();
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=${FORECAST_DAYS}&appid=c3189249f4afdf526538f6f3f81e3750&units=metric`;

  const goBack = () => {
    navigate(-1);
  };

  const formatForecastDate = ms => {
    const date = new Date(ms * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const getForecast = async () => {
    try {
      const response = await axios.get(forecastURL);
      if (!response) throw new Error('no response');
      setForecastData(response.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <div>
      <button className="button goBack_button" onClick={goBack}>
        Back
      </button>
      <Daily cityName={cityName} />
      <MinMaxChart
        forecastData={forecastData}
        formatForecastDate={formatForecastDate}
      />
      <Forecast
        cityName={cityName}
        forecastData={forecastData}
        formatForecastDate={formatForecastDate}
      />
    </div>
  );
}

export default CityDetails;
