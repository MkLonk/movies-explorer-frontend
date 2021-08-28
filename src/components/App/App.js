import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext, defaultUser } from '../../contexts/CurrentUserContext'

import { loadSavedMovies, saveMovie, deleteMovie } from '../../utils/mainApi'


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


/* import { loadMovies } from '../../utils/moviesApi' */

function App() {

  /****************************************
  * Стейт переменные
  ****************************************/
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [loggedIn, setLoggedIn] = useState(true); // залогинен ли пользователь

  const [savedMoviesList, setSavedMoviesList] = useState([]); //массив сохранённых фильмов



  /****************************************
  * Функции работы c контентом
  ****************************************/

  // сохраняет фильм на сервере и ставит лайк его карточке
  function clickSaveMovie(movieData) {
    //saveMovie(movieData)
    //console.log(movieData)
    saveMovie(movieData)
      .then(res => {
        setSavedMoviesList([...savedMoviesList, res.data])
      })
      .catch(err => console.log(err))
  }

  // удаляет фильм с сервера и снимает лайк с карточки
  function clickDeleteMovie(movieId) {
    console.log('movieId', movieId);

    deleteMovie(movieId)
      .then(res => {
        console.log(res.data.message);
        setSavedMoviesList(savedMoviesList.filter((element) => element._id !== movieId));
      })
      .catch(err => console.log(err))
  }

  // при загрузки приложения запросить на сервере список сохраненных карточек
  useEffect(() => {
    loadSavedMovies()
      .then((res) => {
        setSavedMoviesList(res);
      })
      .catch()
  }, [])

  /* */
  /*   const [pageWidth, setPageWidth] = useState(document.documentElement.scrollWidth);
  
    useEffect(() => {
      console.log(pageWidth);
    }, [pageWidth])
  
    window.addEventListener(`resize`, event => {
      setPageWidth(document.documentElement.scrollWidth);
    }, false) */

  /* */


  /*   function handleLoadMovies() { */

  // ВКЛЮЧИ
  /* if (search.length <= 2) {
    setIsVisibleTooltip(true); // показать tooltip
    setMessageTooltip('Ключевое слово должно состоять минимум из 3 симвалов'); // вывести сообщение
    return;
  } */

  /*     setIsVisibleTooltip(false); // спрятать tooltip
      setMessageTooltip(''); //
      setIsVisiblePreloader(true); // показать прелоадер
  
      loadMovies()
        .then((res) => {
          console.log('запрос выполнен');
          setIsVisiblePreloader(false); // спрятать прелоадер */
  // setCounterSearch(counterSearch + 1);

  // const arrMatches = res.filter(movie => movie.nameRU.toLowerCase().includes(search.toLowerCase()));

  /*         if (arrMatches.length === 0) {
            setMessageTooltip('Ничего не найдено'); // вывести сообщение
            setIsVisibleTooltip(true); // показать tooltip
          } */

  /*         setMovieList(res)
        })
        .catch((err) => console.log(err));
    } */

  // удалить
  /*   useEffect(() => {
      console.log(movieList)
    }, [movieList]); */


  /****************************************
  * Функции работы акаунта
  ****************************************/

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
            <Movies
              clickSaveMovie={clickSaveMovie}
              clickDeleteMovie={clickDeleteMovie}

              savedMoviesList={savedMoviesList}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" exact loggedIn={loggedIn} goBack={handleGoBack} >
            <SavedMovies
              clickDeleteMovie={clickDeleteMovie}

              savedMoviesList={savedMoviesList}
            />
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
