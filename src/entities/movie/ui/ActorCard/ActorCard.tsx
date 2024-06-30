import { FC } from 'react';
import styles from './ActorCard.module.scss';
import { Actor } from '@/shared/lib/types/types';

interface ActorCardProps {
  actor: Actor;
}

export const ActorCard: FC<ActorCardProps> = ({ actor }) => {
  return (
    <div key={actor.name} className={styles.container}>
      <img src={actor.photo} alt={actor.name} className={styles.photo} />
      <span className={styles.name}>{actor.name}</span>
    </div>
  );
};
