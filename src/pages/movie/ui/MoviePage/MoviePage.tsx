import { useParams } from "react-router-dom";
import './MoviePage.module.scss';
import { MovieCard } from '@/entities/movie/ui/MovieCard/MovieCard';
import { useGetMovieByIdQuery } from "@/entities/movie";
import { Loader } from "@/shared/ui/loader";
import { Actors } from "@/widgets/actors/ui/Actors";
import styles from './MoviePage.module.scss';

export const MoviePage = () => {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieByIdQuery(id);

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки</div>;
  
  return (
    <div className={styles.container}>
      <MovieCard movie={movie} />
      <Actors actors={movie.actors} />
    </div>
  )
}
