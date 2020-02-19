import api from '../api/api';

export const getMovie = async (setMovieList, route) => {
  const res = await api.get(`/movie/${route}`);
  setMovieList(res.data.results);
}

