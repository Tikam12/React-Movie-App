import React, { Component } from 'react';
import Navbar from './navbar';
import Home from './home'
import Search from './search';
import MovieDetails from './movieDetails';
import { Route, Routes } from 'react-router-dom';
import Footer from './footer';
import MovieList from './movieList';
import serialList from './serialList';

class App extends Component {
  state = {}

  render() {
    return (
      <div>
        <Navbar />
        <switch>
          <Routes>
            <Route path='/' Component={Home} exact></Route>
            <Route path='/details' Component={MovieDetails} ></Route>
            <Route path='/search/:term' Component={Search}></Route>
            <Route path='/movieList/:term' Component={MovieList}></Route>
            <Route path='/serialList/:term' Component={serialList}></Route>
          </Routes>
        </switch>
        <Footer />
      </div>
    );
  }
}
 
export default App;

