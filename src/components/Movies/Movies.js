import React, { useEffect } from 'react';
import CardsList from "../CardsList/CardsList";
import SearchForm from "../SearchForm/SearchForm";
//import { filterMovies } from '../../utils/utils'


function Movies(props) {

  const { hideTooltip, } = props;

  useEffect(() => {
    hideTooltip();
  }, []);

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