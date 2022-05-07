import { Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Card({ card, clickSaveMovie, clickDeleteMovie, listSavedMovies, }) {

  const [isLikeActive, setIsLikeActive] = useState(false);

  // действие при нажатии на лайк
  function handleLike(e) {
    e.preventDefault();
    if (isLikeActive) {
      // извлекаем из savedMoviesList _id карточки по которой произошел клик
      const idLikeCard = listSavedMovies.filter(element => element.movieId === card.id)[0]._id;
      clickDeleteMovie(idLikeCard);
    } else {
      clickSaveMovie(card)
    }
  }

  // проверяем лайк на карточке при отрисовке
  useEffect(() => {
    setIsLikeActive(listSavedMovies.map(element => element.movieId).includes(card.id))
  }, [listSavedMovies, card.id])


  return (
    <li className="card">
      <h3 className="card__title">{card.nameRU}</h3>
      <p className="card__duration">{card.duration} минут</p>
      <Route exact path="(/movies)">
        <div className="card__image"
          style={{ backgroundImage: `url(https://api.nomoreparties.co${card.image.url})` }}
          onClick={(() => window.open(card.trailerLink))} />
        <button className={`card__button-like ${isLikeActive ? 'card__button-like_active' : ''}`}
          type="button" aria-label="Нравится" onClick={handleLike} />
      </Route>

      <Route exact path="(/saved-movies)">
        <div className="card__image"
          style={{ backgroundImage: `url(${card.image})` }}
          onClick={(() => window.open(card.trailer))} />
        <button className="card__button-like card__button-like-delete"
          type="button" aria-label="Нравится" onClick={handleLike} />
      </Route>
    </li>
  )
}

export default Card;