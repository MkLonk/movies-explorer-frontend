import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from "../SearchForm/SearchForm";
import CardsList from "../CardsList/CardsList";


function SavedMovies(props) {

  const history = useHistory();

  const {loadContent, listSavedMovies, listRenderMovies, showTooltip, hideTooltip } = props

  // сообщения в толтип
  useEffect(() => {
    if (listSavedMovies.length === 0 && history.location.pathname === '/saved-movies') {
      showTooltip('Нет сохранённых фильмов');
      console.log('1')
    } else {
      if (listRenderMovies.length === 0) {
        showTooltip('Нечего не найдено');
        console.log('2')
      } else if (listRenderMovies.length > 0) {
        hideTooltip();
        console.log('3')
      }
    }
  }, [history.location, listSavedMovies, listRenderMovies, showTooltip, hideTooltip])


  useEffect(() => {
    if (history.location.pathname === '/saved-movies') {
      loadContent()
    }
  }, [])

  return (
    <div className="saved-movies" >
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

export default SavedMovies;