import axios from "axios";

const BASE_URL = "http://localhost:2020";
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

//refresh neradi bez with credentials default, a error je negdi unutar axios private
