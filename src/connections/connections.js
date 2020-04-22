import api from '../api/api';

export const getMovie = async (setMovieList, route, page, setTotalPages) => {
  const res = await api.get(`/movie/${route}`, {
    params: {
      page: page
    }
  });
  setMovieList(res.data.results);
  setTotalPages(res.data.total_pages);
}

export const clearMovie = (setMovieList) => {
  setMovieList([]);
}

export const getMovieByGenre = async (setMovieList, genreId, page, setTotalPages, sortBy) => {
  const res = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page: page,
      sort_by: sortBy,
    }
  });
  setMovieList(res.data.results);
  setTotalPages(res.data.total_pages);
}

export const getMovieDetails = async (id, setMovie, setMovieLoading) => {
  const res = await api.get(`/movie/${id}`);
  setMovie(res.data);
  setMovieLoading(false)
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
