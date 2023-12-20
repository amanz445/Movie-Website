import React from 'react'
import Hero from './Home components/Hero'
import Trending from './Home components/TrendingMovies'
import PopularMovies from './Home components/PopularMovies'
import Movies from './Home components/Movies'
import Watch from './Home components/Watch'

const Home = () => {
  return (
    <>
      <Hero />
      <Trending />
      <PopularMovies />
      <Watch />
      <Movies />
    </>
  )
}

export default Home
