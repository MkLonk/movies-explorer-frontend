import React, { useState, useEffect } from 'react';
import Preloader from "../Preloader/Preloader";
import Tooltip from '../Tooltip/Tooltip';

function SearchForm(props) {

  const [search, setSearch] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmitSearch(search);
  }

  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  return (

    <form className="search-form" name="" method="get" onSubmit={handleSubmit}>
      <div className="search-form__row">
        <div className="search-form__logo" />
        <input className="search-form__input" id="" type="text" name=""
          placeholder="Фильм" /* required */ onChange={handleSearchChange} />
        <button className="search-form__button" type="submit" value="Искать" />
      </div>

      <Tooltip isVisible={props.isVisibleTooltip} message={props.messageTooltip} />

      <div className="search-form__row">
        <input className="search-form__checkbox" type="checkbox" id="isShortFilm" name="a" value="true" defaultChecked />
        <label className="search-form__label" htmlFor="isShortFilm">Короткометражки</label>
      </div>

      <Preloader isVisible={props.isVisiblePreloader} />
    </form>
  )
}

export default SearchForm;