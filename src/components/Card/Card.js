import { Route } from "react-router-dom";

function Card({ card }) {

  const cardStyle = { backgroundImage: `url(https://api.nomoreparties.co${card.image.url})` };

  return (

    <li className="card">
      <h3 className="card__title">{card.nameRU}</h3>
      <p className="card__duration">{card.duration} минут</p>
      <div className="card__image" style={cardStyle} />
      <Route exact path="(/movies)">
        <button className={`card__button-like ${card.like ? 'card__button-like_active' : ''}`} type="button" aria-label="Нравится" />
      </Route>

      <Route exact path="(/saved-movies)">
        <button className="card__button-like card__button-like-delete" type="button" aria-label="Нравится" />
      </Route>
    </li>
  )
}

export default Card;