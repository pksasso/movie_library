import api from '../api/api';

export const getMovie = async (setMovieList, route) => {
  const res = await api.get(`/movie/${route}`);
  setMovieList(res.data.results);
}

export const getMovieByGenre = async (setMovieList, id) => {
  const res = await api.get(`/discover/movie/`, {
    params: {
      with_genres: id,
      sort_by: 'popularity.desc',
    }
  });
  console.log(res.data.results);
  setMovieList(res.data.results);
}