import { FC, useState, useRef, useEffect } from 'react';
import styles from './Actors.module.scss';
import { Actor } from '@/shared/lib/types/types';
import { ActorCard } from '@/entities/movie/ui/ActorCard/ActorCard';
import { Switcher } from '@/shared/ui/switcher';

interface ActorsProps {
  actors: Actor[];
}

export const Actors: FC<ActorsProps> = ({ actors }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (listRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
      }
    };

    checkScroll();

    listRef.current?.addEventListener('scroll', checkScroll);

    return () => listRef.current?.removeEventListener('scroll', checkScroll);
  }, [actors]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Актеры</h3>
      <div className={styles.switcherList}>
        {canScrollLeft && <Switcher isLeft onClick={scrollLeft} className={styles.switcherL} />}
        <div className={styles.list} ref={listRef}>
          {actors.map((actor, i) => (
            <ActorCard key={actor.name + i} actor={actor} />
          ))}
        </div>
        {canScrollRight && <Switcher onClick={scrollRight} className={styles.switcherR} />}
      </div>
    </div>
  );
};
