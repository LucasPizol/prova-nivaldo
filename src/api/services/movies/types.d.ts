interface IMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
}
