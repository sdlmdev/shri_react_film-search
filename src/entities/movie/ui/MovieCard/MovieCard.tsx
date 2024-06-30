import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import { Movie } from '@/shared/lib/types/types';
import { Rating } from '@/features/rating/ui/Rating';


interface MovieCardProps {
  varian?: 'default' | 'small';
  movie: Movie;
}

export const MovieCard: FC<MovieCardProps> = ({ varian = 'default', movie }) => {
  const isSmall = varian === 'small';

  const getClassName = (baseClass: string, condition: boolean, conditionalClass: string) => {
    return `${baseClass}${condition ? ` ${conditionalClass}` : ''}`;
  };

  const cardContent = (
    <article className={getClassName(styles.container, isSmall, styles.containerSmall)}>
      <img
        src={movie.poster}
        alt={movie.title}
        className={getClassName(styles.poster, isSmall, styles.posterSmall)}
      />
      <div className={getClassName(styles.info, isSmall, styles.infoSmall)}>
        <h3 className={getClassName(styles.title, isSmall, styles.titleSmall)}>{movie.title}</h3>
        {isSmall ? (
          <div className={styles.infoContent}>
            <div className={styles.spansSmall}>
              <span className={getClassName(styles.subtitle, isSmall, styles.subtitleSmall)}>
                Жанр
              </span>
              <span className={getClassName(styles.subtitle, isSmall, styles.subtitleSmall)}>
                Год выпуска
              </span>
              <span className={getClassName(styles.subtitle, isSmall, styles.subtitleSmall)}>
                Рейтинг
              </span>
              <span className={getClassName(styles.subtitle, isSmall, styles.subtitleSmall)}>
                Описание
              </span>
            </div>
            <div className={styles.detailsSmall}>
              <p>{movie.genre}</p>
              <p>{movie.release_year}</p>
              <p>{movie.rating}</p>
              <p>{movie.description}</p>
            </div>
          </div>
        ) : (
          <>
            <p>
              <span className={styles.subtitle}>Жанр: </span>
              {movie.genre}
            </p>
            <p>
              <span className={styles.subtitle}>Год выпуска: </span>
              {movie.release_year}
            </p>
            <p>
              <span className={styles.subtitle}>Рейтинг: </span>
              {movie.rating}
            </p>
            <span className={styles.subtitle}>Описание</span>
            <p className={styles.description}>{movie.description}</p>
          </>
        )}
      </div>
      <Rating
        currentRating={+movie.rating}
        movieId={String(movie.id)}
      />
    </article>
  );

  return isSmall ? (
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};
