function SearchForm() {
  return (

    <form className="search-form" name="" method="get" onSubmit="">
      <div className="search-form__row">
        <div className="search-form__logo" />
        <input className="search-form__input" id="" type="text" name=""
          placeholder="Фильм" required />
        <button className="search-form__button" type="submit" value="Искать" />
      </div>

      <div className="search-form__row">
        <input className="search-form__checkbox" type="checkbox" id="isShortFilm" name="a" value="true" defaultChecked />
        <label className="search-form__label" htmlFor="isShortFilm">Короткометражки</label>
      </div>
    </form>
  )
}

export default SearchForm;