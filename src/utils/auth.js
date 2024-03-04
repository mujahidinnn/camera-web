import { Cookies } from "react-cookie";

const nameApp = import.meta.env.VITE_APP_NAME_APP;

const cookies = new Cookies();

export function getAuthToken() {
  const token = cookies.get(`${nameApp}_token`);
  return token;
}

export function setToken(token) {
  if (token) {
    cookies.set(`${nameApp}_token`, JSON.stringify(token));
  } else {
    cookies.remove(`${nameApp}_token`);
  }
}
