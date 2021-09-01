import React, { useState, useRef, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { checkInputValidity } from '../../utils/checkInputValidity'


function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidForm, setIsValidForm] = useState(false);

  const inputEmailRef = useRef(false); // инпут UserEmail
  const inputPasswordRef = useRef(false); // инпут UserPassword

  const [userEmailErrorText, setUserEmailErrorText] = useState('Обязательное поле'); // текст ошибки UserEmail
  const [userPasswordErrorText, setUserPasswordErrorText] = useState('Обязательное поле'); // текст ошибки UserPassword

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
    props.loginUser(email, password);
  }

  useEffect(() => {
    if (!userEmailErrorText && !userPasswordErrorText) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [userEmailErrorText, userPasswordErrorText])


  return (
    < section className = "login" >
      { props.loggedIn ? <Redirect to='/' /> : null }
      <Link className="login__logo" to="./" />
      <h2 className="login__title">Рады видеть!</h2>

      <form className="form" onSubmit={handleSubmit} method="get">

        <div className="form__inputs">

          <div className="form__input-element">
            <label className="form__input-label" htmlFor="user-email-input">E-mail</label>
            <input className="form__input" id="user-email-input" type="email"
              name="userEmailInput" ref={inputEmailRef} onChange={handleEmailChange} required />
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
        {/* <button className="form__button" type="submit">Войти</button> */}

        <button className={`form__button ${isValidForm ? '' : 'form__button_type_inactive'}`}
          type="submit" disabled={!isValidForm} >
          Войти
        </button>

        {props.apiError ? <p className="form__error-message">{props.apiError}</p> : null}

        <p className="form__text">Ещё не зарегистрированы?
          <Link className="form__link" to="./signup">Регистрация</Link>
        </p>

      </form>
    </section >
  )
}

export default Login;