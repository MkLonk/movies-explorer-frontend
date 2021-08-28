import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import CardsList from "../CardsList/CardsList";

function SavedMovies(props) {

  const [searchSavedMoviesList, setSearchSavedMoviesList] = useState([props.savedMoviesList]); //массив сохранённых фильмов

  useEffect(() => {
    setSearchSavedMoviesList(props.savedMoviesList)
  }, [props.savedMoviesList])

  return (
    <div className="saved-movies" >
      <SearchForm
        showOnlyLikes={true}
        savedMoviesList={props.savedMoviesList}
        searchSavedMoviesList={searchSavedMoviesList}
        setSearchSavedMoviesList={setSearchSavedMoviesList}
      />

      <CardsList

        showOnlyLikes={true}
        savedMoviesList={props.savedMoviesList}
        searchSavedMoviesList={searchSavedMoviesList}
        clickDeleteMovie={props.clickDeleteMovie}
      />
    </div>
  )
}

export default SavedMovies;