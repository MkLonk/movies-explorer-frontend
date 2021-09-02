import React, { useState, useRef, /* useContext, */ useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
//import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import { checkInputValidity } from '../../utils/checkInputValidity'

function Register(props) {

  //const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  const inputNameRef = useRef(false); // инпут UserName
  const inputEmailRef = useRef(false); // инпут UserEmail
  const inputPasswordRef = useRef(false); // инпут UserPassword

  const [userNameErrorText, setUserNameErrorText] = useState('Обязательное поле'); // текст ошибки UserName
  const [userEmailErrorText, setUserEmailErrorText] = useState('Обязательное поле'); // текст ошибки UserEmail
  const [userPasswordErrorText, setUserPasswordErrorText] = useState('Обязательное поле'); // текст ошибки UserPassword

  function handleNameChange(e) { //при вводе в инпут Name
    checkInputValidity(inputNameRef, setUserNameErrorText);
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    checkInputValidity(inputEmailRef, setUserEmailErrorText);
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    checkInputValidity(inputPasswordRef, setUserPasswordErrorText);
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.registerUser(name, email, password);
  }

  useEffect(() => {
    if (!userNameErrorText && !userEmailErrorText && !userPasswordErrorText) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [userNameErrorText, userEmailErrorText, userPasswordErrorText])


  if (!props.loggedIn) {
    return (

      <section className="register">
        <Link className="register__logo" to="./" />
        <h2 className="register__title">Добро пожаловать!</h2>

        <form className="form__form" onSubmit={handleSubmit} method="get">

          <div className="form__inputs">

            <div className="form__input-element">
              <label className="form__input-label" htmlFor="user-name-input">Имя</label>
              <input className="form__input" id="user-name-input" type="text"
                name="userNameInput" ref={inputNameRef} onChange={handleNameChange}
                placeholder="Пользователль" maxLength={30} minLength={3} required />
              <span className="form__input-error" id="user-name-input-error">{userNameErrorText}</span>
            </div>

            <div className="form__input-element">
              <label className="form__input-label" htmlFor="user-email-input">E-mail</label>
              <input className="form__input" id="user-email-input" type="email"
                placeholder="user@mail.com" name="userEmailInput" ref={inputEmailRef} onChange={handleEmailChange} required />
              <span className="form__input-error" id="user-email-input-error">{userEmailErrorText}</span>
            </div>

            <div className="form__input-element">
              <label className="form__input-label" htmlFor="user-password-input">Пароль</label>
              <input className="form__input" id="user-password-input" type="password"
                name="userPasswordInput" ref={inputPasswordRef} onChange={handlePasswordChange}
                minLength={2} required />
              <span className="form__input-error" id="user-password-input-error">{userPasswordErrorText}</span>
            </div>

          </div>

          <button className={`form__button ${isValidForm ? '' : 'form__button_type_inactive'}`}
            type="submit" disabled={!isValidForm} >
            Зарегистрироваться
          </button>

          {props.apiError ? <p className="form__error-message">{props.apiError}</p> : null}

          <p className="form__text">Уже зарегистрированы?
            <Link className="form__link" to="./signin">Войти</Link>
          </p>

        </form>
      </section>
    )
  } else {
    return <Redirect to="./movies" />
  }
}

export default Register;