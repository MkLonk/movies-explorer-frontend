import React, { useState, useEffect } from 'react';
import { Route } from "react-router-dom";
//import { loadSavedMovies, saveMovie, deleteMovie } from '../../utils/mainApi'


import Card from "../Card/Card";

function CardsList(props) {

  const [isVisibleMoreBtn, setIsVisibleMoreBtn] = useState(false); // показать кнопку 'Еще'
  const [counterCards, setCounterCards] = useState(initLimitCards()); // сколько карточек отрисовать

  // возвращает число карточек которые надо отрисовать при сабмите поиска 
  function initLimitCards() {
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 918) {
      return 12;
    } else if (pageWidth > 636) {
      return 8;
    } else {
      return 5;
    }
  }

  // возвращает число карточек которые надо отрисовать при нажатии кнопки 'Еще'
  function initLoadMore() {
    const pageWidth = document.documentElement.scrollWidth;
    if (pageWidth > 918) {
      return 3;
    } else {
      return 2;
    }
  }

  // добавить карточки, кол-во зависит от размера окна
  function addCards(e) {
    e.preventDefault();
    setCounterCards(counterCards + initLoadMore());
  };

  // когда выполнен сабмит поиска, установить кол-во отрисовываемых карточек
  useEffect(() => {
    setCounterCards(initLimitCards())
  }, []);

  // показывать кнопку еще?
  useEffect(() => {
    props.listRenderMovies.length > counterCards ? setIsVisibleMoreBtn(true) : setIsVisibleMoreBtn(false);
  }, [counterCards, props.listRenderMovies])


  return (
    < section className="card-list" >

      <Route exact path="(/movies)">
        <ul className="card-list__grid">
          {props.listRenderMovies.slice(0, counterCards).map((movieData) => {
            return <Card
              key={movieData.id}
              card={movieData}
              clickSaveMovie={props.clickSaveMovie}
              clickDeleteMovie={props.clickDeleteMovie}
              listSavedMovies={props.listSavedMovies}
            />
          })}
        </ul>
        {isVisibleMoreBtn ? <button className="card-list__load-more" onClick={addCards} /> : null}
      </Route>

      <Route exact path="(/saved-movies)">
        <ul className="card-list__grid">
          {props.listRenderMovies.slice(0, counterCards).map((movieData) => {
            return <Card
              key={movieData._id}
              card={{ ...movieData, id: movieData.movieId }}
              clickSaveMovie={props.clickSaveMovie}
              clickDeleteMovie={props.clickDeleteMovie}
              listSavedMovies={props.listSavedMovies}
            />
          })}
        </ul>
      </Route>

    </section >
  )
}

export default CardsList;