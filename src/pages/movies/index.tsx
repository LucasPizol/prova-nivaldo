import styles from "./styles.module.scss";

import { MoviesService } from "../../api/services/movies/service";
import { useRequest } from "../../hooks/useRequest";
import { useCallback } from "react";
import { Carousel } from "../../components/carousel";
import { Button } from "../../components/button";
import { IResponse } from "../../api/api";
import { MovieList } from "./movie-list";

export const Movies = () => {
  function returnData<T>(data: NonNullable<IResponse<IPagination<T>>> | null) {
    return data?.[0]?.results || [];
  }

  const popularMovies = useRequest(
    ["popular_movies"],
    MoviesService.getPopularMovies,
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const upcomingMovies = useRequest(
    ["upcoming_movies"],
    MoviesService.getUpcomingMovies,
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  const nowPlayingMovies = useRequest(
    ["now_playing_movies"],
    MoviesService.getNowPlayingMovies,
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const getRandomMovies = useCallback((movies: IMovie[]) => {
    const randomMovies: IMovie[] = [];

    movies.forEach((movie) => {
      if (randomMovies.length === 5) return;

      if (!randomMovies.includes(movie)) {
        randomMovies.push(movie);
      }
    });

    return randomMovies;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.carousel}>
          <Carousel interval={10000}>
            {getRandomMovies([
              ...(returnData(popularMovies.data) || []),
              ...(returnData(upcomingMovies.data) || []),
              ...(returnData(nowPlayingMovies.data) || []),
            ]).map((movie) => (
              <Carousel.Item
                key={movie.id}
                image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              >
                <h2 className={styles.carousel_title}>{movie.title}</h2>
                <p className={styles.carousel_description}>{movie.overview}</p>
                <Button>Assistir agora</Button>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <MovieList {...upcomingMovies} title="Estão por vir" />
        <MovieList {...popularMovies} title="Filmes populares" />
        <MovieList {...nowPlayingMovies} title="Agora nos cinemas" />
      </div>
    </div>
  );
};
