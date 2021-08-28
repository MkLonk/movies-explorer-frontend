import React, { useState } from 'react';
import CardsList from "../CardsList/CardsList";
import SearchForm from "../SearchForm/SearchForm";



function Movies(props) {

  const [moviesList, setMoviesList] = useState([]);
  const [counterSearch, setCounterSearch] = useState(0); // счетчик нажатия кнопки 'поиск'

  return (
    <div className="movies">

      <SearchForm
        moviesList={moviesList}
        setMoviesList={setMoviesList}
        counterSearch={counterSearch}
        setCounterSearch={setCounterSearch}
      />

      <CardsList
        moviesList={moviesList}
        savedMoviesList={props.savedMoviesList}
        counterSearch={counterSearch}

        clickSaveMovie={props.clickSaveMovie}
        clickDeleteMovie={props.clickDeleteMovie}
      />
    </div>
  )
}

export default Movies;