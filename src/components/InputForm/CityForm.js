import React, { useRef } from 'react';
import './CityForm.css';

function CityForm({ getCityNames, cityNames }) {
  const inputRef = useRef();

  const handleSubmit = () => {
    if (!inputRef.current.value) return;
    getCityNames(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <div className="cityForm_container">
      <form className="cityForm" action="#">
        <label className="cityForm_label" htmlFor="city">
          Add a city to your list
        </label>
        <div className="cityForm_inputBox">
          <input
            maxLength={88}
            className="cityForm_input"
            ref={inputRef}
            type="text"
            placeholder="City name"
            autoFocus
          />
          <button
            className={`button ${
              cityNames.length >= 10 ? 'disabled' : 'cityForm_button_submit'
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={cityNames.length >= 10}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default CityForm;
