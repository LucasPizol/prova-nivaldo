import { api } from "../../api";

async function getPopularMovies() {
  return await api.get<IPagination<IMovie[]>>("/movie/popular");
}

async function getUpcomingMovies() {
  return await api.get<IPagination<IMovie[]>>("/movie/upcoming");
}

async function getNowPlayingMovies() {
  return await api.get<IPagination<IMovie[]>>("/movie/now_playing");
}

async function searchMovies(query: string, page: number) {
  return await api.get<IPagination<IMovie[]>>("/search/movie", {
    params: {
      query,
      page,
    },
  });
}

export const MoviesService = {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
};
