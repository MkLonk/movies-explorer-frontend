import React, { useState } from "react";
import { Route, Link, NavLink } from "react-router-dom";

function Navigation(props) {

  const [isOpenNavigation, setIsOpenNavigation] = useState(false);

  function handleOpenNavigation() {
    setIsOpenNavigation(true)
  }

  function handleCloseNavigation() {
    setIsOpenNavigation(false)
  }

  if (props.loggedIn) {
    return (
      <nav className="navigation">
        <Route exact path="(/|/profile|/movies|/saved-movies)">

          <div className={`navigation__background ${isOpenNavigation ?
            'navigation__background_open' :
            'navigation__background_close'} `} />
          <button className="navigation__button" onClick={handleOpenNavigation} />
          <div className={`navigation__links ${isOpenNavigation ?
            'navigation__links_open' :
            'navigation__links_close'} `}>

            <button className="navigation__close" onClick={handleCloseNavigation} />
            <NavLink className="navigation__link navigation__link_main"
              activeClassName="navigation__link_active" to="./" exact>Главная
            </NavLink>
            <NavLink className="navigation__link" activeClassName="navigation__link_active" to="./movies">
              Фильмы
            </NavLink>
            <NavLink className="navigation__link" activeClassName="navigation__link_active" to="./saved-movies">
              Сохранённые фильмы
            </NavLink>

            <Link className="navigation__profile" to="./profile" />

          </div>
        </Route>
      </nav>
    )
  }

  return (
    <Route exact path="(/)">
      <div className="navigation__links-auth">
        <Link className="navigation__link-auth" to="./signup">Регистрация</Link>
        <Link className="navigation__link-auth navigation__link-auth_type_marked" to="./signin">Войти</Link>
      </div>
    </Route>
  )
}

export default Navigation;