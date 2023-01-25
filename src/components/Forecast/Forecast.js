import React from 'react';
import './Forecast.css';

function Forecast({ forecastData, formatForecastDate }) {
  return (
    <div>
      <div className="forcast_table">
        {forecastData.map(day => (
          <table key={day.dt}>
            <tbody>
              <tr className="table_data">
                <td className="card">
                  <p className="forecast_date">{formatForecastDate(day.dt)}</p>
                  <p
                    className={`forecast_degree ${
                      day?.temp?.day > 20
                        ? 'hot'
                        : day?.temp?.day < 10
                        ? 'cold'
                        : 'normal'
                    }`}
                  >
                    {Math.round(day?.temp?.day)}°<span>C</span>
                  </p>
                  {day.weather[0].icon && (
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                  )}
                  <p className="forecast_description">
                    {day.weather[0].description}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
