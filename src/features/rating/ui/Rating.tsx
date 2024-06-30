import { useEffect, useState, FC } from 'react';
import styles from './Rating.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/types/types';
import { useRateMovieMutation } from '@/entities/movie'

interface RatingProps {
  currentRating: number;
  movieId: string;
}

export const Rating: FC<RatingProps> = ({ currentRating, movieId }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(currentRating);
  const isLoggedIn = useSelector((state: RootState) => state.session.isLogin);
  const [ rateMovie ] = useRateMovieMutation();

  const updateRating = async () => {
    try {
      await rateMovie({ movieId, user_rate: selectedRating });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const userRating = localStorage.getItem(movieId);
      if (userRating) {
        setSelectedRating(Number(userRating));
      } else {
        setSelectedRating(currentRating);
      }
    };
  
    handleStorageChange();
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [movieId, currentRating, isLoggedIn]);

  const handleMouseEnter = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (rating: number) => {
    if (isLoggedIn) {
      setSelectedRating(rating);
      localStorage.setItem(movieId, String(rating));
      updateRating();
    } else {
      document.getElementById('auth-btn')?.click();
    }
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          className={`${styles[`star${star}`]} ${star <= (hoveredRating || selectedRating) ? styles[`star${star}-active`] : ''}`}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
          key={star}
          id={String(star)}
        />
      ))}
    </div>
  );
};