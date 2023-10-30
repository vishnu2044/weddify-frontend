import React from 'react';
import './cssFiles/regDirectory.css';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';

function RegDirectory() {
  return (
    <div className='backgroundDiv d-flex mt-3' >

        <div className='text-div col-3 '>
          <h3 className='regText'>Find your perfect partner</h3>
        </div>
        <div className='button-div col-2'>
          <Link className='regButton' to='/signup'>register here</Link>
         
        </div>

    </div>
  )
}

export default RegDirectory