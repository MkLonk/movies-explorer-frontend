export const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const urlMoviesApi = 'https://api.nomoreparties.co/beatfilm-movies';
//export const urlMainApi = 'https://api.diploma.mihailov.nomoredomains.club';
export const urlMainApi = 'http://localhost:3001';