import axios from "axios";
import authHeader from './auth.header'

const API_URL = "http://localhost:4000/api/auth/";

const register = (username, email, password) => {
  return axios
    .post(API_URL + "register", {
      username,
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  return axios.get(API_URL + "loguot", { headers: authHeader() });
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const isLogged = () => {
  if (sessionStorage.getItem("user")) {
    return true;
  }
  return false;
}

const getUserData = () => {
  return axios.get(API_URL + "userData", { headers: authHeader() })
  .then((response) => {
    return response
  });
}

const getRoles = () => {
  return axios.get(API_URL + "roles");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getRoles,
  getUserData,
  isLogged
};
