import React, { useState, useEffect, useContext, useRef } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { checkInputValidity } from '../../utils/checkInputValidity'

function Profile(props) {

  const currentUser = useContext(CurrentUserContext); // подписка на контекст

  const [name, setName] = useState(''); // значение для инпута UserName
  const [email, setEmail] = useState(''); // значение для инпута UserEmail
  const [nameTitle, setNameTitle] = useState(currentUser.name); // для изменения имини в profile__title

  const inputNameRef = useRef(false); // инпут UserName
  const inputEmailRef = useRef(false); // инпут UserEmail

  const [userNameErrorText, setUserNameErrorText] = useState(''); // текст ошибки для UserName
  const [userEmailErrorText, setUserEmailErrorText] = useState(''); // текст ошибки для UserEmail


  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e) {
    checkInputValidity(inputNameRef, setUserNameErrorText);
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    checkInputValidity(inputEmailRef, setUserEmailErrorText);
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNameTitle(name);
    props.updateUser(name, email);
  }


  return (

    <section className="profile">
      <h2 className="profile__title">Привет, {nameTitle}!</h2>
      <form className="form profile__form" onSubmit={handleSubmit}>
        <div className="form__inputs">

          <div className="form__input-element form__input-element_page_profile">
            <label className="form__input-label form__input-label_page_profile"
              htmlFor="user-name-input" >Имя</label>
            <input className="form__input form__input_page_profile" id="user-name-input" type="text"
              name="userNameInput" ref={inputNameRef} onChange={handleNameChange}
              value={name} maxLength={30} minLength={3} required />
            <span className="form__input-error form__input-error_page_profile" id="user-name-input-error">
              {userNameErrorText}
            </span>
          </div>

          <div className="form__input-element form__input-element_page_profile">
            <label className="form__input-label form__input-label_page_profile"
              htmlFor="user-email-input">E-mail</label>
            <input className="form__input form__input_page_profile" id="user-email-input" type="email"
              name="userEmailInput" value={email} ref={inputEmailRef} onChange={handleEmailChange} required />
            <span className="form__input-error form__input-error_page_profile" id="user-email-input-error">
              {userEmailErrorText}
            </span>
          </div>

        </div>
        <button className="form__button form__button_page_profile" type="submit">Редактировать</button>
        <button className="form__button form__button_page_profile form__button_color_red"
          type="button" onClick={props.logout}>Выйти из аккаунта</button>

      </form>
    </section>

  )

}

export default Profile;