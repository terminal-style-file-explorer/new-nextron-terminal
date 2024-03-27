import { User } from '../components/Terminal'
export const setToLS = (key: string, value: string) => {
  // window.localStorage.setItem(key, JSON.stringify(value));
  window.localStorage.setItem(key, value);
};

export const getFromLS = (key: string) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return value;
  }
};

export const setUserToLS = (user: User) => {
  window.localStorage.setItem('user', JSON.stringify(user));
}

export const getUserFromLS = () => {
  const user = window.localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
}
