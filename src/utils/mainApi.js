import { getResponse, urlMainApi } from './utils'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTAzODg0ODZkYTFkOTc0YTc1ZTA4MTMiLCJpYXQiOjE2Mjk5NzM0MDgsImV4cCI6MTYzMDU3ODIwOH0.ktxyM1fUWNBVrDdmNByc7gf9H4ECZrEDTpRjsxqM-N4';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTI5OWNhYTEwZGRiYjNkYTg1NzgxNzEiLCJpYXQiOjE2MzAxMTcwNDYsImV4cCI6MTYzMDcyMTg0Nn0.9CAbY3pNf-rMDzhbFaAc5PFSHbHU29uU5fDSLtIh2mM';

export function loadSavedMovies() {
  return fetch(`${urlMainApi}/movies/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  })
    .then(getResponse)
}


export function saveMovie(movieData) {

  function isValidUrl(url) {
    const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    return objRE.test(url);
  }

  if (!movieData.country) movieData.country = 'Нет данных.'
  if (!isValidUrl(movieData.trailerLink)) { movieData.trailerLink = 'http://diploma.mihailov.nomoredomains.club/PageNotFound'}

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

  //console.log(JSON.parse(raw))
  //console.log(raw)
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


export function deleteMovie(movieId) {

  return fetch(`${urlMainApi}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
  })
    .then(getResponse)
}
