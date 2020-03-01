import api from '../api/api';

export const getMovie = async (setMovieList, route) => {
  const res = await api.get(`/movie/${route}`);
  setMovieList(res.data.results);
}

export const clearMovie = (setMovieList) => {
  setMovieList([]);
}

export const getMovieByGenre = async (setMovieList, genreId) => {
  const res = await api.get(`/discover/movie/`, {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
    }
  });
  setMovieList(res.data.results);
}

export const getMovieDetails = async (id, setMovie) => {
  const res = await api.get(`/movie/${id}`);
  setMovie(res.data);
}


export const getMovieRecommendations = async (
  setRecommendations,
  movieId,
  setIsLoading) => {
  const res = await api.get(`/movie/${movieId}/recommendations`);
  setRecommendations(res.data.results);
  setIsLoading(false);
}

export const loadGenre = () => {
  return api.get(`/genre/movie/list`).then(
    function (res) { return res }
  );
}
