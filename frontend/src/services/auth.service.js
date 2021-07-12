import axios from "axios";

const API_URL = "http://localhost:4000/api/auth/";

const register = async(username, email, password) => {
  return await axios
    .post(API_URL + "register", {
      username,
      email,
      password,
    })
    .then((response) => {
      return response;
    })
};

const login = async(username, password) => {
  return await axios
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

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

const isLogged = () => {
  if (sessionStorage.getItem("user")) {
    return true;
  }
  return false;
}

export default {
  register,
  login,
  getCurrentUser,
  isLogged
};
