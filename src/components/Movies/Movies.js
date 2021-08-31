import React, { useEffect } from 'react';
import CardsList from "../CardsList/CardsList";
import SearchForm from "../SearchForm/SearchForm";


function Movies(props) {
  //  if (props.listSavedMovies.length === 0 && history.location.pathname === '/saved-movies') {

  // сообщения в толтип props.valueSearch.length === 0 && props.counterSearch > 0
  useEffect(() => {
    if (props.counterSearch === 0) {
      props.hideTooltip();
    } else if (props.listRenderMovies.length === 0 && props.counterSearch > 0) {
      props.showTooltip('Нечего не найдено');
    } else {
      props.hideTooltip();
    }
  }, [])

  const loadContent = props.loadContent

  useEffect(() => {
    loadContent()
  }, [])

  return (
    <div className="movies">
      <SearchForm
        searchMovies={props.searchMovies} // функция поиска
        isVisiblePreloader={props.isVisiblePreloader} // показать прелоадер
        isVisibleTooltip={props.isVisibleTooltip} // показать тултип
        messageTooltip={props.messageTooltip} // сообщение тултипа
        isCheckedShortFilm={props.isCheckedShortFilm} // состояние чекбокса ShortFilm
        setIsCheckedShortFilm={props.setIsCheckedShortFilm} // изменение состояния чекбокса ShortFilm
      />

      <CardsList
        listRenderMovies={props.listRenderMovies} // список фильмов для рендера
        listSavedMovies={props.listSavedMovies} // список сохранённых фильмов
        clickSaveMovie={props.clickSaveMovie} // клик сохранить
        clickDeleteMovie={props.clickDeleteMovie} // клик удалить
      />
    </div>
  )
}

export default Movies;