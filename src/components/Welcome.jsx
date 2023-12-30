import React from 'react'
import { NavLink } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-white text-black'>
      <div>
        <h1 className='m-10'>Welcome</h1>
        <NavLink to="/Movie-Website/home" className="text-white bg-black py-3 px-6 rounded-lg">View Page</NavLink>
      </div>
    </div>
  )
}

export default Welcome
