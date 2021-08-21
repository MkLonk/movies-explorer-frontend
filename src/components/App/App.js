import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext, defaultUser } from '../../contexts/CurrentUserContext'

/* import './App.css'; */
import Header from '../Header/Header'
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {

  /****************************************
  * Стейт переменные
  ****************************************/
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [loggedIn, setLoggedIn] = useState(false); // залогинен ли пользователь

  // функция входа пользователя
  function loginUser(email, password) {
    setLoggedIn(true);
    console.log('функция loginUser еще не работает');
    history.push('/movies');
  }

  // функция выхода пользователя
  function logout() {
    setLoggedIn(false);
    console.log('Вы вышли из аккаунта');
    history.push('/signin');
  }

  // функция регистрации
  function registerUser(name, email, password) {
    console.log('функция registerUser еще не работает');
    history.push('/');
  }

  // функция изменения данных пользоваталя
  function updateUser(name, email) {
    console.log('функция updateUser еще не работает');
  }

  // функция возврат назад
  function handleGoBack() {
    return history.goBack();
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="app" >

        <Header loggedIn={loggedIn} />

        <Switch>

          <Route path="/signup">
            <Register registerUser={registerUser} />
          </Route>

          <Route path="/signin">
            <Login loginUser={loginUser} />
          </Route>

          <Route exact path="(/)">
            <Main />
          </Route>

          {/* Защищенные роуты */}
          <ProtectedRoute path="/profile" exact loggedIn={loggedIn} goBack={handleGoBack} logout={logout} updateUser={updateUser} >
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute path="/movies" exact loggedIn={loggedIn} goBack={handleGoBack} >
            <Movies />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" exact loggedIn={loggedIn} goBack={handleGoBack} >
            <SavedMovies />
          </ProtectedRoute>

          <Route path="*">
            <PageNotFound goBack={handleGoBack} />
          </Route>

        </Switch>

        <Footer />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
