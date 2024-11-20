import styles from "./styles.module.scss";

interface IMovieProps {
  movie: IMovie;
}

export const Movie = ({ movie }: IMovieProps) => {
  return (
    <div className={styles.movie}>
      <div className={styles.movie__attributes}>
        <h2>{movie.title}</h2>
        <p className={styles.attributes__overview}>{movie.overview}</p>
        <div className={styles.attributes__line}>
          <p className={styles.release_date}>
            {new Date(movie.release_date).toLocaleDateString("pt-br")}
          </p>

          <div className={styles.movie__rating}>
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  index < Math.floor(movie.vote_average / 2) ? "yellow" : "none"
                }
                stroke="#fff"
                strokeWidth={
                  index < Math.floor(movie.vote_average / 2) ? "0" : "1"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.star}
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </div>
  );
};
