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

  /****************************************
  * Функции работы c контентом
  ****************************************/

  // сохраняет фильм на сервере и ставит лайк его карточке
  function clickSaveMovie(movieData) {
    const token = localStorage.getItem('jwt');

    saveMovie(movieData, token)
      .then(res => {
        setListSavedMovies([...listSavedMovies, res.data])
      })
      .catch(err => console.log(err))
  }

  // удаляет фильм с сервера и из listSavedSearchMovies, снять лайк с карточки
  function clickDeleteMovie(movieId) {
    console.log('movieId', movieId);
    const token = localStorage.getItem('jwt');

    deleteMovie(movieId, token)
      .then(res => {
        console.log(res.data.message);
        setListSavedMovies(listSavedMovies.filter((element) => element._id !== movieId));
        setListSavedSearchMovies(listSavedMovies.filter((element) => element._id !== movieId));
      })
      .catch(err => console.log(err))
  }

  const [listAllMovies, setListAllMovies] = useState([]); // список всех найденых фильмов
  const [listSavedMovies, setListSavedMovies] = useState([]); //список сохранённых фильмов
  const [listSavedSearchMovies, setListSavedSearchMovies] = useState([]); // список фильмов отфильтрованный поиском

  const [isVisiblePreloader, setIsVisiblePreloader] = useState(false); // показать Preloader
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false); // показать Tooltip
  const [messageTooltip, setMessageTooltip] = useState(''); // сообщение в Tooltip
  const [isCheckedShortFilm, setIsCheckedShortFilm] = useState(true); // чекбокс 'короткометражки'

  const [serverError, setServerError] = useState(null); // сообщение от сервера


  // сбрасываем список сохранённых отфильтрованный поиском фильмов
  function resetListSavedSearchMovies() {
    setListSavedSearchMovies(listSavedMovies)
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

        const searchList = searchByArray(res, search)

        if (searchList.length === 0) {
          showTooltip('Нечего не найдено');
          setListAllMovies([]);
        } else {

          if (isCheckedShortFilm) {
            localStorage.setItem('moviesList', JSON.stringify(searchList));
            setListAllMovies(searchList);
          } else {
            filterArrayByShortFilms(searchList).length === 0 ?
              showTooltip('Нечего не найдено, попробуйте отключить фильтр и повторить поиск') :
              setListAllMovies(filterArrayByShortFilms(searchList))
          }
        }
      })
      .catch((err) => {
        setIsVisiblePreloader(false);
        showTooltip('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        console.log(err)
      });
  }

  /*   function searchSavedMovies(search) {
      const token = localStorage.getItem('jwt');
      loadSavedMovies(token)
        .then((res) => {
          const searchList = searchByArray(res, search)
          if (!searchList) {
            setListSavedSearchMovies([])
            console.log(searchList)
          } else {
            console.log(searchList)
            setListSavedSearchMovies(searchList)
          }
        })
        .catch(err => console.log(err))
    } */

  function searchSavedMovies(search) {
    const token = localStorage.getItem('jwt');
    console.log('поиск')

    loadSavedMovies(token)
      .then((res) => {
        res.length === 0 ?
          showTooltip('Нет сохранённых фильмов') :
          setListSavedSearchMovies(filterSavedMovies(res, search))
      })
      .catch(err => console.log(err))
  }

  function filterSavedMovies(arr, search) {
    const searchList = searchByArray(arr, search);
    const filterSearchList = filterArrayByShortFilms(searchByArray(arr, search));

    if (isCheckedShortFilm) {
      searchList.length === 0 ?
        showTooltip('Нечего не найдено') :
        hideTooltip();
      return searchList;
    }

    if (!isCheckedShortFilm) {
      filterSearchList.length === 0 ?
        showTooltip('Нечего не найдено, попробуйте отключить фильтр и повторить поиск') :
        hideTooltip();
      return filterSearchList;
    }
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

          loadSavedMovies(token)
            .then((res) => {
              if (!res) {
                setListSavedMovies([])
                setListSavedSearchMovies([])
              } else {
                setListSavedMovies(res)
                setListSavedSearchMovies(res)
              }
            })
            .catch(err => console.log(err))
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
            <Login loginUser={loginUser} apiError={serverError} loggedIn={loggedIn} />
          </Route>

          <Route path="(/)" exact>
            <Main />
          </Route>

          <ProtectedRoute path="/profile" exact loggedIn={loggedIn} >
            <Profile logout={logout} updateUser={updateUser} apiError={serverError} />
          </ProtectedRoute >

          <ProtectedRoute path="/movies" exact loggedIn={loggedIn} >
            <Movies
              //loadContent={loadContent} // функция загрузки контента 
              //valueSearch={valueSearch}
              //counterSearch={counterSearch}
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

              // передать в SearchForm
              //setValueSearch={setValueSearch}
              //searchMovies={searchSavedMovies} // функция поиска по сохранённым фильмам
              isVisiblePreloader={isVisiblePreloader} // показать прелоадер
              isVisibleTooltip={isVisibleTooltip} // показать тултип
              messageTooltip={messageTooltip} // сообщение тултипа
              isCheckedShortFilm={isCheckedShortFilm} // состояние чекбокса ShortFilm
              setIsCheckedShortFilm={setIsCheckedShortFilm} // изменение состояния чекбокса ShortFilm

              // передать в CardsList
              showTooltip={showTooltip}
              hideTooltip={hideTooltip}
              resetListSavedSearchMovies={resetListSavedSearchMovies}

              searchMovies={searchSavedMovies}
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
