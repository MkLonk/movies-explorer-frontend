export const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const urlMoviesApi = 'https://api.nomoreparties.co/beatfilm-movies';