import { getResponse, urlMoviesApi } from './utils'

export function loadMovies() {
  return fetch(`${urlMoviesApi}/`, {
    method: 'GET',
  })
    .then(getResponse)
}