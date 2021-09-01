import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from "../SearchForm/SearchForm";
import CardsList from "../CardsList/CardsList";


function SavedMovies(props) {

  const history = useHistory();
  const {
    listRenderMovies,
    listSavedMovies,
    showTooltip,
    hideTooltip } = props;

  // сообщения в толтип
  useEffect(() => {
    if (listSavedMovies.length === 0 && history.location.pathname === '/saved-movies') {
      showTooltip('Нет сохранённых фильмов');
    }

    if (listSavedMovies.length > 0 && history.location.pathname === '/saved-movies') {
      if (listRenderMovies.length === 0) {
        showTooltip('Нечего не найдено, попробуйте отключить фильтр');
      } else if (listRenderMovies.length > 0) {
        hideTooltip();
      }
    }
  })

  useEffect(() => {
    props.searchMovies('');
  }, [])

  return (
    <div className="saved-movies" >
      <SearchForm
        setValueSearch={props.setValueSearch}
        searchMovies={props.searchMovies} // функция поиска
        isVisiblePreloader={props.isVisiblePreloader} // показать прелоадер
        isVisibleTooltip={props.isVisibleTooltip} // показать тултип
        messageTooltip={props.messageTooltip} // сообщение тултипа
        isCheckedShortFilm={props.isCheckedShortFilm} // состояние чекбокса ShortFilm
        setIsCheckedShortFilm={props.setIsCheckedShortFilm} // изменение состояния чекбокса ShortFilm
      />

      <CardsList
        listRenderMovies={props.listRenderMovies} // список фильмов для рендера
        //listRenderMovies={listRenderMovies} // список фильмов для рендера
        listSavedMovies={props.listSavedMovies} // список сохранённых фильмов
        clickSaveMovie={props.clickSaveMovie} // клик сохранить
        clickDeleteMovie={props.clickDeleteMovie} // клик удалить
      />
    </div>
  )
}

export default SavedMovies;