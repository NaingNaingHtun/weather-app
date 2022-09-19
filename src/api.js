import axios from "axios";
export const WEATHER_API_KEY = "c22b0b52f325012baddf62412fb28fcd";
const api = new axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo",
  headers: {
    "X-RapidAPI-Key": "ed0cba4761msh46eaed993cc5fe5p179ef7jsnc3c90158ff0a",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});
export default api;
