import { DURATION_SHORT_FILM } from '../utils/constans'

export const getResponse = (res) => {
  if (res.ok) {
    return res.json()
  }

  if (res.status === 400 ||
    res.status === 401 ||
    res.status === 403 ||
    res.status === 404 ||
    res.status === 409) {
    return res.json()
      .then(res => Promise.reject(res.message))
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export const urlMoviesApi = 'https://api.nomoreparties.co/beatfilm-movies';
export const urlMainApi = 'https://api.diploma.mihailov.nomoredomains.club';
//export const urlMainApi = 'http://localhost:3001';

export function searchFilterMovies(arr, setArr, search, isShortFilms, showTooltip, hideTooltip, isSaveToStorage = false) {

  if (arr.length > 0) {
    /*     showTooltip('Нечего не найдено');
        console.log('1') isSaveToStorage
        return; */
    const searchList = arr.filter(movie => movie.nameRU.toLowerCase().includes(search.toLowerCase()));
    const shortFilmsList = searchList.filter(movie => movie.duration >= DURATION_SHORT_FILM)

    if (isShortFilms) {
      if (searchList.length === 0) {
        showTooltip('Нечего не найдено');
        setArr([]);
      } else {
        hideTooltip();
        setArr(searchList);
        if (isSaveToStorage) localStorage.setItem('moviesList', JSON.stringify(searchList));
      }
    }

    if (!isShortFilms) {
      if (shortFilmsList.length === 0) {
        showTooltip('Нечего не найдено,попробуйте отключить фильтр и повторить поиск');
        setArr([]);
      } else {
        hideTooltip();
        setArr(shortFilmsList);
        if (isSaveToStorage) localStorage.setItem('moviesList', JSON.stringify(shortFilmsList));
      }
    }
  }
}



/* export function filterMovies(arr, setArr, isShortFilms, showTooltip, hideTooltip) {

  if (arr.length > 0) {

    const shortFilmsList = arr.filter(movie => movie.duration >= DURATION_SHORT_FILM)

    if (isShortFilms) {
      if (arr.length === 0) {
        console.log('Нечего не найдено')
        showTooltip('Нечего не найдено');
        setArr([]);
      } else {
        console.log(arr)
        hideTooltip();
        setArr(arr);
      }
    }

    if (!isShortFilms) {
      if (shortFilmsList.length === 0) {
        showTooltip('Нечего не найдено,попробуйте отключить фильтр и повторить поиск');
        setArr([]);
      } else {
        console.log(shortFilmsList)
        hideTooltip();
        setArr(shortFilmsList);
      }
    }
  }
} */