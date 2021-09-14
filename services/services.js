import axios from 'axios';

const base_url = 'https://api.themoviedb.org/3';
const api_key = '08484ba1cbfada10e8ba8cc892363fc8';
const popular_movies_endpoint = `${base_url}/movie/popular?api_key=${api_key}`;
const upcoming_movies_endpoint = `${base_url}/movie/upcoming?api_key=${api_key}`;
const popular_tv_endpoint = `${base_url}/tv/popular?api_key=${api_key}`;
const family_movies_endpoint = `${base_url}/discover/movie?api_key=${api_key}&with_genres=10751`;
const documentary_endpoint = `${base_url}/discover/movie?api_key=${api_key}&with_genres=99`;

export const getPopularMovies = async () => {
  const response = await axios.get(popular_movies_endpoint);
  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(family_movies_endpoint);
  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(upcoming_movies_endpoint);
  return response.data.results;
};

export const getPopularTv = async () => {
  const response = await axios.get(popular_tv_endpoint);
  return response.data.results;
};

export const getDocumentaries = async () => {
  const response = await axios.get(documentary_endpoint);
  return response.data.results;
};

export const getMovie = async id => {
  const response = await axios.get(
    `${base_url}/movie/${id}?api_key=${api_key}`,
  );
  return response.data;
};

export const searchMovieTv = async (query, type) => {
  const response = await axios.get(
    `${base_url}/search/${type}?api_key=${api_key}&query=${query}`,
  );
  return response.data.results;
};
