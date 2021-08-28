import { Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Card({ card, clickSaveMovie, clickDeleteMovie, savedMoviesList, showOnlyLikes }) {

  const [isLikeActive, setIsLikeActive] = useState(checkLike());
  const cardStyle = showOnlyLikes ?
    { backgroundImage: `url(${card.image})` } :
    { backgroundImage: `url(https://api.nomoreparties.co${card.image.url})` };

  function checkLike() {
    return savedMoviesList.map(element => element.movieId).includes(card.id)
  }

  function clickLike(e) {
    e.preventDefault();

    if (showOnlyLikes) {
      clickDeleteMovie(card._id);
      return
    }

    if (isLikeActive) {
      // извлекаем из savedMoviesList _id карточки по которой произошел клик
      const idLikeCard = savedMoviesList.filter(element => element.movieId === card.id)[0]._id;
      clickDeleteMovie(idLikeCard);
    } else {
      clickSaveMovie(card)
    }
  }



  useEffect(() => {
    setIsLikeActive(savedMoviesList.map(element => element.movieId).includes(card.id))
  }, [savedMoviesList, card.id])

  function clickTrailer(e) {
    showOnlyLikes ? window.open(card.trailer) : window.open(card.trailerLink)
  }

  return (
    <li className="card">
      <h3 className="card__title">{card.nameRU}</h3>
      <p className="card__duration">{card.duration} минут</p>
      <div className="card__image" style={cardStyle} onClick={clickTrailer} />
      <Route exact path="(/movies)">
        <button className={`card__button-like ${isLikeActive ? 'card__button-like_active' : ''}`}
          type="button" aria-label="Нравится" onClick={clickLike} />
      </Route>

      <Route exact path="(/saved-movies)">
        <button className="card__button-like card__button-like-delete"
          type="button" aria-label="Нравится" onClick={clickLike} />
      </Route>
    </li>
  )
}

export default Card;