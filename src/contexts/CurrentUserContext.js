import React from 'react';

export const CurrentUserContext = React.createContext();

export const defaultUser = {
  name: 'Пользователь',
  email: 'user@mail.com',
}