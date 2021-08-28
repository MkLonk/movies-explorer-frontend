import React, { useState, useEffect } from 'react';
import Preloader from "../Preloader/Preloader";
import Tooltip from '../Tooltip/Tooltip';

import { loadMovies } from '../../utils/moviesApi'


function SearchForm(props) {
  // стейт переменные
  const [search, setSearch] = useState(''); // что в инпуте
  const [isCheckedShortFilm, setIsCheckedShortFilm] = useState(true); // чекбокс 'короткометражки'
  const [isVisiblePreloader, setIsVisiblePreloader] = useState(false); // показать Preloader
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false); // показать Tooltip
  const [messageTooltip, setMessageTooltip] = useState(''); // сообщение в Tooltip

  // переназначить пропсы
  const {
    moviesList,
    setMoviesList,
    savedMoviesList,
    counterSearch,
    setCounterSearch,
    showOnlyLikes,
    setSearchSavedMoviesList
  } = props;

  // функция поиска по массивы arr с ключевым словом search
  function searchFilm(arr, search) {
    return arr.filter(movie => movie.nameRU.toLowerCase().includes(search.toLowerCase()));
  }

  // функция оставляет в массиве arr только элементы с duration >= 40
  function filteredShortFilm(arr) {
    return arr.filter(movie => movie.duration >= 40);
  }

  // показать сообщение в tooltip
  function showWarning(message) {
    setMessageTooltip(message); // вывести сообщение
    setIsVisibleTooltip(true); // показать tooltip
  }

  // спрятать tooltip
  function hideWarning() {
    setMessageTooltip(''); // вывести сообщение
    setIsVisibleTooltip(false); // показать tooltip
  }

  // сабмит форма поиска
  function handleSubmit(e) {

    localStorage.setItem('search', search)
    console.log(search);
    e.preventDefault();

    hideWarning();
    setIsVisiblePreloader(true); // показать прелоадер */

    if (!showOnlyLikes) {
      loadMovies()
        .then((res) => {
          console.log('запрос выполнен');
          localStorage.setItem('moviesList', JSON.stringify(searchFilm(res, search)))

          if (isCheckedShortFilm) {
            setMoviesList(searchFilm(res, search));
          } else {
            setMoviesList(filteredShortFilm(searchFilm(res, search)));
          }

          setIsVisiblePreloader(false); // спрятать прелоадер
          setCounterSearch(counterSearch + 1) // увеличить counterSearch
        })
        .catch((err) => console.log(err));
    } else {
      // props.setSearchSavedMoviesList(searchFilm(savedMoviesList, search))
      setSearchSavedMoviesList(searchFilm(savedMoviesList, search))
      setIsVisiblePreloader(false); // спрятать прелоадер
    }
  }

  // при первой загрузке страницы отчистить localStorage
  /*   useEffect(() => {
      localStorage.removeItem('moviesList');
    }, []) */

  // при первой загрузке убрать проверить результат последнего поиска
  useEffect(() => {
    if (localStorage.getItem('search')) {
      setSearch(localStorage.getItem('search'))
    } else {
      setSearch('')
      hideWarning();
    }
  }, [])

  // показать или убрать сообщение 'Ничего не найдено'
  useEffect(() => {
    if (!showOnlyLikes) {
      if (moviesList.length === 0) {
        showWarning('Ничего не найдено');
      } else {
        hideWarning();
      }
    } else {
      if (savedMoviesList.length === 0) {
        showWarning('Нет сохранённых фильмов');
      } else if (props.searchSavedMoviesList.length === 0) {
        showWarning('Ничего не найдено');
      } else {
        hideWarning();
      }
    }
  }, [moviesList, showOnlyLikes, counterSearch, savedMoviesList, props.searchSavedMoviesList])


  // если в localStorage есть запись 'moviesList'
  // то применить к этой записи фильтр CheckedShortFilm
  useEffect(() => {
    if (localStorage.getItem('moviesList') && !showOnlyLikes) {
      if (!isCheckedShortFilm) {
        setMoviesList(filteredShortFilm(JSON.parse(localStorage.getItem('moviesList'))));
      } else {
        setMoviesList(JSON.parse(localStorage.getItem('moviesList')))
      }
    }
  }, [isCheckedShortFilm, showOnlyLikes, setMoviesList])


  // фильтр для сохраниённых 
  useEffect(() => {
    if (showOnlyLikes) {
      if (!isCheckedShortFilm) {
        //props.setSearchSavedMoviesList(filteredShortFilm(savedMoviesList))
        setSearchSavedMoviesList(filteredShortFilm(savedMoviesList))
      } else {
        //props.setSearchSavedMoviesList(savedMoviesList)
        setSearchSavedMoviesList(savedMoviesList)
      }
    }
  }, [isCheckedShortFilm, showOnlyLikes, savedMoviesList, setSearchSavedMoviesList])


  /* инпуты */
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  /* чекбокс */
  function chengeShortFilm() {
    setIsCheckedShortFilm(!isCheckedShortFilm);
  }


  return (

    <form className="search-form" name="" method="get" onSubmit={handleSubmit}>
      <div className="search-form__row">
        <div className="search-form__logo" />
        <input className="search-form__input" id="" type="text" name="" value={search}
          placeholder="Фильм" /* required */ onChange={handleSearchChange} />
        <button className="search-form__button" type="submit" value="Искать" />
      </div>

      <Tooltip isVisible={isVisibleTooltip} message={messageTooltip} />

      <div className="search-form__row">
        <input className="search-form__checkbox" type="checkbox" id="isShortFilm" name="a"
          onChange={chengeShortFilm} defaultChecked />
        <label className="search-form__label" htmlFor="isShortFilm">Короткометражки</label>
      </div>

      <Preloader isVisible={isVisiblePreloader} />

    </form>
  )
}

export default SearchForm;