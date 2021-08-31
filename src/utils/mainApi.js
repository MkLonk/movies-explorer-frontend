import { getResponse, urlMainApi } from './utils'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTAzODg0ODZkYTFkOTc0YTc1ZTA4MTMiLCJpYXQiOjE2Mjk5NzM0MDgsImV4cCI6MTYzMDU3ODIwOH0.ktxyM1fUWNBVrDdmNByc7gf9H4ECZrEDTpRjsxqM-N4';
/* let token = '';

if (localStorage.getItem('jwt')) {
  token = localStorage.getItem('jwt')
} */


export function loadSavedMovies(token) {
  return fetch(`${urlMainApi}/movies/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  })
    .then(getResponse)
}

export function saveMovie(movieData, token) {

  function isValidUrl(url) {
    const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    return objRE.test(url);
  }

  if (!movieData.country) movieData.country = 'Нет данных.'
  if (!isValidUrl(movieData.trailerLink)) { movieData.trailerLink = 'http://diploma.mihailov.nomoredomains.club/PageNotFound' }

  const raw = JSON.stringify({
    country: movieData.country,
    director: movieData.director,
    duration: movieData.duration,
    year: movieData.year,
    description: movieData.description,
    image: `https://api.nomoreparties.co${movieData.image.url}`,
    trailer: movieData.trailerLink,
    thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
    nameRU: movieData.nameRU,
    nameEN: movieData.nameEN,
    movieId: movieData.id,
  })

  return fetch(`${urlMainApi}/movies/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: raw,
  })
    .then(getResponse)
}

export function deleteMovie(movieId, token) {

  return fetch(`${urlMainApi}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  })
    .then(getResponse)
}

export function register(name, email, password) {

  return fetch(`${urlMainApi}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
    .then(getResponse)
}

export function login(email, password) {

  const raw = JSON.stringify({ email, password });

  return fetch(`${urlMainApi}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: raw
  })
    .then(getResponse)
}

export function getUserData(token) {

  return fetch(`${urlMainApi}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(getResponse)
}

export function changeUserData(userData, token) {

  const raw = JSON.stringify(userData);

  return fetch(`${urlMainApi}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: raw
  })
    .then(getResponse)
}