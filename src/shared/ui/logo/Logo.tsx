import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className={styles.logo}>Фильмопоиск</Link>
  )
};
