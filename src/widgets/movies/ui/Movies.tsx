import { useState, ChangeEvent } from 'react';
import styles from './Movies.module.scss';
import { useGetFilmsQuery } from '@/entities/movie/api/movieApi';
import { Loader } from '@/shared/ui/loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { SearchInput } from '@/shared/ui/searchInput';
import { MovieCard } from '@/entities/movie/ui/MovieCard/MovieCard';
import { Movie } from '@/shared/lib/types/types';
import { Switcher } from '@/shared/ui/switcher';
import useDebounce from '@/shared/lib/hooks/useDebounce';

export const Movies = () => {
  const [page, setPage] = useState(1);
  const genre = useSelector((state: RootState) => state.movies.genreFilter);
  const year = useSelector((state: RootState) => state.movies.yearFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Используйте хук useDebounce

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const {
    data: movies,
    error,
    isLoading,
  } = useGetFilmsQuery({ genre: genre, release_year: year, title: debouncedSearchQuery, page });

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(newPage);
  }

  if (isLoading) return <Loader />;

  return (
    <section className={styles.movies}>
      <SearchInput
        placeholder="Название фильма"
        value={searchQuery}
        onChange={handleChange}
        setValue={setSearchQuery}
      />
      {(movies?.total_pages === 0 || error || !movies) && (
        <div className={styles.error}>
          <h4 className={styles.errorTitle}>Фильмы не найдены</h4>
          <p className={styles.errorSubtitle}>Измените запрос и попробуйте снова</p>
        </div>
      )}
      <div className={styles.list}>
        {movies?.search_result.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} varian="small" />
        ))}
      </div>
      {movies && movies?.total_pages > 0 && (
        <div className={styles.switchers}>
          <Switcher
            onClick={() => handlePageChange(page - 1)}
            isLeft
            isSmall
            isDisable={page === 1}
          />
          <span>{page}</span>
          <Switcher
            onClick={() => handlePageChange(page + 1)}
            isSmall
            isDisable={movies?.total_pages === page}
          />
        </div>
      )}
    </section>
  );
};
