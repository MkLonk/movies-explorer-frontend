import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(false); // залогинен ли пользователь

  /****************************************
  * Функции работы c контентом
  ****************************************/

  // сохраняет фильм на сервере и ставит лайк его карточке
  function clickSaveMovie(movieData) {
    //saveMovie(movieData)
    //console.log(movieData)
    saveMovie(movieData)
      .then(res => {
        setListSavedMovies([...listSavedMovies, res.data])
      })
      .catch(err => console.log(err))
  }

  // удаляет фильм с сервера и из listSavedSearchMovies, снять лайк с карточки
  function clickDeleteMovie(movieId) {
    console.log('movieId', movieId);

    deleteMovie(movieId)
      .then(res => {
        console.log(res.data.message);
        setListSavedMovies(listSavedMovies.filter((element) => element._id !== movieId));
        setListSavedSearchMovies(listSavedMovies.filter((element) => element._id !== movieId));
      })
      .catch(err => console.log(err))
  }

  const [listAllMovies, setListAllMovies] = useState([]); // список всех найденых фильмов
  const [listSavedMovies, setListSavedMovies] = useState([]); //список сохранённых фильмов
  const [listSavedSearchMovies, setListSavedSearchMovies] = useState([]); //список фильмов отфильтрованный поиском

  const [isVisiblePreloader, setIsVisiblePreloader] = useState(false); // показать Preloader
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false); // показать Tooltip
  const [messageTooltip, setMessageTooltip] = useState(''); // сообщение в Tooltip
  const [isCheckedShortFilm, setIsCheckedShortFilm] = useState(true); // чекбокс 'короткометражки'

  const [serverError, setServerError] = useState(null); // сообщение от сервера
  const [valueSearch, setValueSearch] = useState(''); // значение инпута поиска
  const [counterSearch, setCounterSearch] = useState(0); // счетчик поиска 

  // функция загрузки сохранённых карточек
  function loadContent() {
    const token = localStorage.getItem('jwt');
    loadSavedMovies(token)
      .then((res) => {
        setListSavedMovies(res)
        setListSavedSearchMovies(res)
        console.log('setListSavedMovies')
      })
      .catch()
  }

  // функция поиска по массиву arr с ключевым словом search
  function searchByArray(arr, search) {
    return arr.filter(movie => movie.nameRU.toLowerCase().includes(search.toLowerCase()));
  }

  // функция оставляет в массиве arr только элементы с duration >= 40
  function filterArrayByShortFilms(arr) {
    return arr.filter(movie => movie.duration >= 40);
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
      //setValueSearch(search)
      showTooltip('Нужно ввести ключевое слово');
      return;
    }

    setIsVisibleTooltip(false);
    setIsVisiblePreloader(true);
    loadMovies()
      .then((res) => {
        setIsVisiblePreloader(false);
        if (searchByArray(res, search).length === 0) {
          showTooltip('Нечего не найдено');
        } else {
          localStorage.setItem('moviesList', JSON.stringify(searchByArray(res, search)));
          setListAllMovies(searchByArray(res, search));
        }
        console.log(res)
      })
      .catch((err) => {
        setIsVisiblePreloader(false);
        showTooltip('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err)
      });
  }

  // поиск по сохранённым фильмам
  function searchSavedMovies(search) {
    setListSavedSearchMovies(searchByArray(listSavedMovies, search))
  }

  /****************************************
  * Функции работы акаунта
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
    console.log('Вы вышли из аккаунта');
    history.push('/signin');
  }

  // при загрузки страницы проверить права пользователя
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      getUserData(token)
        .then((res) => {
          setLoggedIn(true);
        })
        .catch(err => {
          localStorage.removeItem('jwt');
          console.log(`Ошибка при проверки прав пользователя: ${err}`)
        });
    }
  }, [history]);

  // загрузка информации о пользователе
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (loggedIn && token) {
      getUserData(token)
        .then((res) => {
          setCurrentUser(res);
          if (localStorage.getItem('moviesList')) {
            setListAllMovies(JSON.parse(localStorage.getItem('moviesList')));
          }
        })
        .catch(err => console.log(`Ошибка при загрузки информации о пользователе: ${err}`));
    }
  }, [loggedIn]);

  // функция изменения данных пользоваталя
  function updateUser(userData) {
    const token = localStorage.getItem('jwt');

    changeUserData(userData, token)
      .then((res) => {
        setCurrentUser(res)
        console.log('данные изменены')
      })
      .catch(err => console.log(err))
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
            <Register registerUser={registerUser} apiError={serverError} />
          </Route>

          <Route path="/signin">
            <Login loginUser={loginUser} apiError={serverError} />
          </Route>

          <Route path="(/)" exact>
            <Main />
          </Route>

          <ProtectedRoute path="/profile" exact loggedIn={loggedIn} >
            <Profile logout={logout} updateUser={updateUser} apiError={serverError} />
          </ProtectedRoute >

          <ProtectedRoute path="/movies" exact loggedIn={loggedIn} >
            <Movies
              loadContent={loadContent} // функция загрузки контента 
              valueSearch={valueSearch}
              counterSearch={counterSearch}
              // передать в SearchForm
              searchMovies={searchAllMovies} // функция поиска по всем фильмам
              isVisiblePreloader={isVisiblePreloader} // показать прелоадер
              isVisibleTooltip={isVisibleTooltip} // показать тултип
              messageTooltip={messageTooltip} // сообщение тултипа
              isCheckedShortFilm={isCheckedShortFilm} // состояние чекбокса ShortFilm
              setIsCheckedShortFilm={setIsCheckedShortFilm} // изменение состояния чекбокса ShortFilm

              // передать в CardsList
              showTooltip={showTooltip}
              hideTooltip={hideTooltip}
              listRenderMovies={isCheckedShortFilm ?
                listAllMovies :
                filterArrayByShortFilms(listAllMovies)} // список фильмов для рендеринга 
              listSavedMovies={listSavedMovies} // список сохранёных фильмов
              clickSaveMovie={clickSaveMovie} // клик сохранить
              clickDeleteMovie={clickDeleteMovie} // клик удалить
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies" exact loggedIn={loggedIn} >
            <SavedMovies

              loadContent={loadContent}
              // передать в SearchForm
              searchMovies={searchSavedMovies} // функция поиска по сохранённым фильмам
              isVisiblePreloader={isVisiblePreloader} // показать прелоадер
              isVisibleTooltip={isVisibleTooltip} // показать тултип
              messageTooltip={messageTooltip} // сообщение тултипа
              isCheckedShortFilm={isCheckedShortFilm} // состояние чекбокса ShortFilm
              setIsCheckedShortFilm={setIsCheckedShortFilm} // изменение состояния чекбокса ShortFilm

              // передать в CardsList
              showTooltip={showTooltip}
              hideTooltip={hideTooltip}
              listRenderMovies={isCheckedShortFilm ? //список фильмов для рендеринга
                listSavedSearchMovies :
                filterArrayByShortFilms(listSavedSearchMovies)}
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
