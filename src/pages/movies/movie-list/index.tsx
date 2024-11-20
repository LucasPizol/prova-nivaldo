import { useCallback } from "react";
import { IResponse } from "../../../api/api";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "react-activity";
import { Movie } from "../../../components/movie";
import { useScreenSize } from "../../../context/screen-size/use-screen-size";

interface IMovieListProps {
  data: NonNullable<IResponse<IPagination<IMovie[]>>> | null;
  isLoading: boolean;
  title: string;
}

export const MovieList = ({ data, isLoading, title }: IMovieListProps) => {
  const { sm, xs, md } = useScreenSize();

  const returnData = useCallback(
    (data: NonNullable<IResponse<IPagination<IMovie[]>>> | null) => {
      return data?.[0]?.results || [];
    },
    []
  );

  return (
    <>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>

      <Swiper
        spaceBetween={12}
        slidesPerView={sm || xs ? 2.5 : md ? 5.5 : 7.5}
        className={styles.swiper}
        grabCursor
      >
        {isLoading && <Spinner />}

        {!isLoading &&
          returnData(data).map((movie) => (
            <SwiperSlide className={styles.slide}>
              <Movie key={movie.id} movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};
