import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CityForm from '../../components/InputForm/CityForm';
import './CityList.css';

function CityList() {
  const [cityNames, setCityNames] = useState(() => {
    const getLocalStorage = localStorage.getItem('cityNames');
    return JSON.parse(getLocalStorage) || [];
  });

  const getCityNames = newCityNames => {
    if (cityNames.length < 10) {
      setCityNames([...cityNames, newCityNames]);
    }
  };

  const deleteCityName = index => {
    if (index > -1) {
      setCityNames(cityNames.filter(el => ![cityNames[index]].includes(el)));
    }
  };

  useEffect(() => {
    // storing the city name to localStorage
    if (cityNames.length < 11) {
      localStorage.setItem('cityNames', JSON.stringify(cityNames));
    }
  }, [cityNames]);

  return (
    <div className="cityList">
      <CityForm getCityNames={getCityNames} cityNames={cityNames} />
      <div className="cityList_box">
        {cityNames.map((city, index) => (
          <div key={index} className="cityList_names">
            <div className="cityList_item">
              <Link className="cityList_link" to={`city/${city}`}>
                {`${index + 1}. ${city}`}
              </Link>
              <button
                className="button cityList_delete_button"
                type="button"
                onClick={() => deleteCityName(index)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityList;
