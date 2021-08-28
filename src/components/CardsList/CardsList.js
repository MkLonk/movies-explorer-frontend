import React, { useState, useEffect } from 'react';

import Card from "../Card/Card";

function CardsList(props) {

  const showOnlyLikes = props.showOnlyLikes

  const [isVisibleMoreBtn, setIsVisibleMoreBtn] = useState(false); // показать кнопку 'Еще'
  const [counterCards, setCounterCards] = useState(initLimitCards()); // сколько карточек отрисовать

  // возвращает число карточек которые надо отрисовать при сабмите поиска 
  function initLimitCards() {
    let pageWidth = document.documentElement.scrollWidth;

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
    let pageWidth = document.documentElement.scrollWidth;
    if (pageWidth > 918) {
      return 3;
    } else {
      return 2;
    }
  }

  // когда выполнен сабмит поиска, установить кол-во отрисовываемых карточек
  useEffect(() => {
    setCounterCards(initLimitCards())
  }, [props.counterSearch]);

  // добавить карточки, кол-во зависит от размера окна
  function addCards(e) {
    e.preventDefault();
    setCounterCards(counterCards + initLoadMore());
    console.log('ещё')
  };

  // показывать кнопку еще?
  useEffect(() => {
    if (!showOnlyLikes) {
      props.moviesList.length > counterCards ? setIsVisibleMoreBtn(true) : setIsVisibleMoreBtn(false);
    }
  }, [counterCards, props.moviesList, showOnlyLikes])


  if (!showOnlyLikes) {

    return (
      < section className="card-list" >
        <ul className="card-list__grid">
          {props.moviesList.slice(0, counterCards).map((movieData, index) => {
            return <Card
              key={index}
              card={movieData}
              clickSaveMovie={props.clickSaveMovie}
              clickDeleteMovie={props.clickDeleteMovie}
              savedMoviesList={props.savedMoviesList}
            />
          })}
        </ul>
        {isVisibleMoreBtn ? <button className="card-list__load-more" onClick={addCards} /> : null}
      </section >
    )
  } else {

    return (
      < section className="card-list" >
        <ul className="card-list__grid">
          {props.searchSavedMoviesList.map((movieData, index) => {
            return <Card
              key={index}
              card={movieData}
              clickSaveMovie={props.clickSaveMovie}
              clickDeleteMovie={props.clickDeleteMovie}
              savedMoviesList={props.savedMoviesList}
              searchSavedMoviesList={props.searchSavedMoviesList}

              showOnlyLikes={props.showOnlyLikes}
            />
          })}
        </ul>
      </section>
    )
  }
}

export default CardsList;