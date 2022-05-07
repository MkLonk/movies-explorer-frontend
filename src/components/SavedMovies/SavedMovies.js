import React, { useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import CardsList from "../CardsList/CardsList";
// import { filterMovies } from '../../utils/utils'


function SavedMovies(props) {


  /*   const {
      listRenderMovies,
      listSavedMovies,
      showTooltip,
      hideTooltip,
      setListSavedMoviesRender
    } = props; */

  const {
    showTooltip,
    setListSavedMoviesRender
  } = props;

  useEffect(() => {
    if (props.listSavedMovies.length === 0) showTooltip('У Вас еще нет сохраненный фильмов')
    setListSavedMoviesRender(props.listSavedMovies)
  }, []);


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
        listSavedMovies={props.listSavedMovies} // список сохранённых фильмов
        //clickSaveMovie={props.clickSaveMovie} // клик сохранить
        clickDeleteMovie={props.clickDeleteMovie} // клик удалить
      />
    </div>
  )
}

export default SavedMovies;