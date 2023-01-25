import React from 'react'
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate('/');
    };
    return (
      <div className='pageNotFound'>
        <h1 className="pageNotFound_status">404</h1>
        <h2 className='pageNotFound_title'>City not found</h2>
        <button className="button pageNotFound_button" onClick={goBack}>
          Back
        </button>
      </div>
    );
}

export default PageNotFound;