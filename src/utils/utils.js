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
//export const urlMainApi = 'https://api.diploma.mihailov.nomoredomains.club';
export const urlMainApi = 'http://localhost:3001';