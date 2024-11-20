import styles from "./styles.module.scss";

import { MoviesService } from "../../api/services/movies/service";
import { Movie } from "../../components/movie";
import { useRequest } from "../../hooks/useRequest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-activity";
import classNames from "classnames";

export const SearchMovies = () => {
  const { query } = useParams<{ query: string }>();
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<IMovie[]>([]);

  async function fetchMovies() {
    if (!query) return;
    const [data, error] = await MoviesService.searchMovies(query, page);

    if (error || !data) return;

    if (!results.length) {
      setResults(data.results);
      return data.results;
    }

    setResults((prev) => [...prev, ...data.results]);
    return data.results;
  }

  const { isLoading, refetch, isRefetching } = useRequest(
    ["movies_", query || "search", String(page)],
    fetchMovies,
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    const fetchOnScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        !isLoading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", fetchOnScroll);

    return () => {
      window.removeEventListener("scroll", fetchOnScroll);
    };
  }, [isLoading, refetch]);

  return (
    <div
      className={styles.container}
      onScroll={() => {
        console.log("scrolling");
      }}
    >
      <div className={styles.main}>
        <h2 className={styles.title}>
          Resultados para <span>"{query}"</span>
        </h2>

        <div className={styles.movies}>
          {results.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>

        <div
          className={classNames(styles.loading, {
            [styles.active]: isLoading || isRefetching,
          })}
        >
          <Spinner />
          <p>Carregando</p>
        </div>
      </div>
    </div>
  );
};
