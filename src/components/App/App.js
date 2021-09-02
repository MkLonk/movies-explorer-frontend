import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext, defaultUser } from '../../contexts/CurrentUserContext'

import {
  loadSavedMovies,
  saveMovie,
  deleteMovie,
  register,
  login,
  getUserData,
  changeUserData
} from '../../utils/mainApi'
import { loadMovies } from '../../utils/moviesApi'
import { searchFilterMovies } from '../../utils/utils'


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
  // Общие
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [loggedIn, setLoggedIn] = useState(false); // залогинен ли пользователь

  // Для работы c контентом
  const [listAllMovies, setListAllMovies] = useState([]); // список фильмов c BeatFilm
  const [listAllMoviesRender, setListAllMoviesRender] = useState([]); // список фильмов c BeatFilm
  const [listSavedMovies, setListSavedMovies] = useState([]); //список сохранённых фильмов
  const [listSavedMoviesRender, setListSavedMoviesRender] = useState([]); // список фильмов отфильтрованный поиском
  const [isVisiblePreloader, setIsVisiblePreloader] = useState(false); // показать Preloader
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false); // показать Tooltip
  const [messageTooltip, setMessageTooltip] = useState(''); // сообщение в Tooltip
  const [isCheckedShortFilm, setIsCheckedShortFilm] = useState(true); // чекбокс 'короткометражки'
  const [serverError, setServerError] = useState(null); // сообщение от сервера
  // const [valueSearch, setValueSearch] = useState(''); // значение инпута


  /****************************************
  * Функции работы c контентом
  ****************************************/
  // сохраняет фильм на сервере (лайк на карточке)
  function clickSaveMovie(movieData) {
    const token = localStorage.getItem('jwt');

    saveMovie(movieData, token)
      .then(res => {
        setListSavedMovies([...listSavedMovies, res.data])
      })
      .catch(err => console.log(err))
  }

  // удаляет фильм с сервера (убрать лайк с карточки)
  function clickDeleteMovie(movieId) {
    console.log('movieId', movieId);
    const token = localStorage.getItem('jwt');

    deleteMovie(movieId, token)
      .then(res => {
        console.log(res.data.message);
        setListSavedMovies(listSavedMovies.filter((element) => element._id !== movieId));
        setListSavedMoviesRender(listSavedMoviesRender.filter((element) => element._id !== movieId));
      })
      .catch(err => console.log(err))
  }

  // сообщение в tooltip
  function showTooltip(message) {
    setMessageTooltip(message); // вывести сообщение
    setIsVisibleTooltip(true); // показать tooltip
  }

  // скрыть tooltip
  function hideTooltip() {
    setIsVisibleTooltip(false); // показать tooltip
    setMessageTooltip(''); // вывести сообщение
  }

  // поиск по всем фильмам
  function searchAllMovies(search) {
    if (search.length === 0) {
      showTooltip('Нужно ввести ключевое слово');
      return;
    }
    setIsVisibleTooltip(false); // скрыть тултип
    setIsVisiblePreloader(true); // показать прелоадер

    if (listAllMovies.length === 0) { // поиск выполняется впервые
      console.log('поиск выполняется впервые');

      loadMovies()
        .then((res) => {
          setIsVisiblePreloader(false);
          setListAllMovies(res)

          searchFilterMovies(
            res,
            setListAllMoviesRender,
            search,
            isCheckedShortFilm,
            showTooltip,
            hideTooltip,
            true
          )
        })
        .catch((err) => {
          setIsVisiblePreloader(false);
          showTooltip('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          console.log(err)
        });
    } else {

      console.log('вторичный выполняется поиск');

      searchFilterMovies(
        listAllMovies,
        setListAllMoviesRender,
        search,
        isCheckedShortFilm,
        showTooltip,
        hideTooltip,
        true
      )

      setIsVisiblePreloader(false);
    }
  }

  // поиск по сохранённым фильмам
  function searchSavedMovies(search) {
    setIsVisibleTooltip(false); // скрыть тултип
    setIsVisiblePreloader(true); // показать прелоадер

    searchFilterMovies(
      listSavedMovies,
      setListSavedMoviesRender,
      search,
      isCheckedShortFilm,
      showTooltip,
      hideTooltip
    )

    setIsVisiblePreloader(false); // показать прелоадер
  }

  /****************************************
  * Функции работы аккаунта
  ****************************************/
  // функция входа пользователя
  function loginUser(email, password) {
    setServerError(null)
    login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token) // записываю токен в localStorage
        setLoggedIn(true);
        history.push('/movies'); // отправляем пользователя к приложению
      })
      .catch(err => {
        setServerError(err);
        console.log(err);
      })
  }

  // функция регистрации
  function registerUser(name, email, password) {
    setServerError(null)
    register(name, email, password)
      .then(res => {
        console.log(res)
        loginUser(email, password)
      })
      .catch((err) => {
        setServerError(err);
        console.log(err);
      })
  }

  // функция выхода пользователя
  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('moviesList');
    setListAllMoviesRender([]);
    console.log('Вы вышли из аккаунта');
    history.push('/signin');
  }

  // функция изменения данных пользоваталя
  function updateUser(userData, showMessage) {
    const token = localStorage.getItem('jwt');
    changeUserData(userData, token)
      .then((res) => {
        setCurrentUser(res);
        showMessage('Данные успешно изменены!', true);
        console.log('данные изменены');
      })
      .catch(err => {
        showMessage('Ой! Что-то пошло не так ...');
        console.log(err);
      })
  }

  // функция - возврат назад
  function handleGoBack() {
    return history.goBack();
  }


  /****************************************
  * Эфекты при загрузке страницы и логине 
  ****************************************/
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  // при загрузке страницы проверить права пользователя
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthChecking(true);
      getUserData(token)
        .then((res) => {
          //setCurrentUser(res);
          setLoggedIn(true);
          //history.push('/');
          //history.goBack();
        })
        .catch(err => {
          localStorage.removeItem('jwt');
          console.log(`Ошибка при проверке прав пользователя: ${err}`);
        })
        .finally(() => setIsAuthChecking(false));
    } else {
      setIsAuthChecking(false);
    }
  }, [history]);

  // загрузка информации о пользователе
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const moviesList = localStorage.getItem('moviesList');

    if (loggedIn && token) {
      getUserData(token)
        .then((res) => setCurrentUser(res))
        .catch(err => console.log(`Ошибка при загрузки информации о пользователе: ${err}`));

      if (moviesList) {
        setListAllMoviesRender(JSON.parse(moviesList));
      }

      loadSavedMovies(token)
        .then((res) => {
          if (!res) {
            setListSavedMovies([])
            setListSavedMoviesRender([])
          } else {
            setListSavedMovies(res)
            setListSavedMoviesRender(res)
          }
        })
        .catch(err => console.log(`Ошибка при загрузки информации о пользователе: ${err}`));
    }
  }, [loggedIn]);


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="app" >

        <Header loggedIn={loggedIn} />

        <Switch>

          <Route path="/signup">
            <Register registerUser={registerUser} apiError={serverError} loggedIn={loggedIn} />
          </Route>

          <Route path="/signin">
            <Login loginUser={loginUser} apiError={serverError} loggedIn={loggedIn} />
          </Route>

          <Route path="(/)" exact>
            <Main />
          </Route>

          <ProtectedRoute path="/profile" exact loggedIn={loggedIn} isChecking={isAuthChecking}>
            <Profile logout={logout} updateUser={updateUser} apiError={serverError} />
          </ProtectedRoute >

          <ProtectedRoute path="/movies" exact loggedIn={loggedIn} isChecking={isAuthChecking}>
            <Movies
              // передать в SearchForm
              searchMovies={searchAllMovies} // функция поиска по всем фильмам
              isVisiblePreloader={isVisiblePreloader} // показывать ли прелоадер
              isVisibleTooltip={isVisibleTooltip} // показывать ли тултип
              messageTooltip={messageTooltip} // изменить сообщение в тултипе
              isCheckedShortFilm={isCheckedShortFilm} // состояние чекбокса ShortFilm
              setIsCheckedShortFilm={setIsCheckedShortFilm} // изменение состояния чекбокса
              // передать в CardsList
              listRenderMovies={listAllMoviesRender} // список фильмов для рендеринга
              listSavedMovies={listSavedMovies} // список сохранёных фильмов
              //showTooltip={showTooltip} // для отображения сообщений о поиске
              hideTooltip={hideTooltip} // для скрытия сообщений о поиске
              clickSaveMovie={clickSaveMovie} // клик сохранить
              clickDeleteMovie={clickDeleteMovie} // клик удалить
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" exact loggedIn={loggedIn} isChecking={isAuthChecking}>
            <SavedMovies
              // передать в SearchForm
              searchMovies={searchSavedMovies} // функция поиска по сохранённым фильмам
              isVisiblePreloader={isVisiblePreloader} // показывать ли прелоадер
              isVisibleTooltip={isVisibleTooltip} // показывать ли тултип
              messageTooltip={messageTooltip} // изменить сообщение в тултипе
              isCheckedShortFilm={isCheckedShortFilm} // состояние чекбокса ShortFilm
              setIsCheckedShortFilm={setIsCheckedShortFilm} // изменение состояния чекбокса

              // передать в CardsList
              showTooltip={showTooltip} // для отображения сообщений о поиске
              // hideTooltip={hideTooltip} // для скрытия сообщений о поиске
              setListSavedMoviesRender={setListSavedMoviesRender}
              listRenderMovies={listSavedMoviesRender} //список фильмов для рендеринга
              listSavedMovies={listSavedMovies} // список сохранёных фильмов
              clickDeleteMovie={clickDeleteMovie} // клик удалить
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
