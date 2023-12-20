import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import MoviesPage from './components/MoviesPage';
import Nav from './components/Nav';
import Welcome from './components/Welcome';
import SeriesPage from './SeriesPage';
import GenrePage from './GenrePage';

function App() {
  /* const apiKey = 'd9aa109c31f76cdca097ed5121699292';
  const apiUrl = 'https://api.themoviedb.org/3';
  const endpoint = '/tv/popular';

  fetch(`${apiUrl}${endpoint}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log('Popular series:', data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    }); */

  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/home" component={Home} />
          <Route path="/movies" component={MoviesPage} />
          <Route path="/series" component={SeriesPage} />
          <Route path="/genre" component={GenrePage} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;