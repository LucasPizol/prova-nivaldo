import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type ICarouselItemProps = {
  image: string;
  children: ReactNode;
};

type ICarouselProps = {
  interval?: number;
  children: ReactNode[];
};

const CarouselItem = ({ children, image }: ICarouselItemProps) => {
  return (
    <div className={styles.carousel__item}>
      <img src={image} alt="carousel item" />

      <div className={styles.carousel__item__content}>{children}</div>
    </div>
  );
};

export const Carousel = ({ children, interval = 5000 }: ICarouselProps) => {
  const [current, setCurrent] = useState(0);

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeout.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % children.length);
    }, interval);

    return () => (timeout.current ? clearInterval(timeout.current) : undefined);
  }, [children.length, interval]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carousel__container}
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 1s ease",
        }}
      >
        {children}
      </div>

      <div className={styles.carousel__indicators}>
        {children.map((_, index) => (
          <button
            key={index}
            className={classNames(styles.carousel__indicator, {
              [styles.active]: current === index,
            })}
            onClick={() => {
              clearInterval(timeout.current);
              timeout.current = setInterval(() => {
                setCurrent((prev) => (prev + 1) % children.length);
              }, interval);
              setCurrent(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.Item = CarouselItem;
