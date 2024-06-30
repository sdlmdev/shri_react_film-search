import styles from './MainLayout.module.scss';
import { Header } from '@/widgets/header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  
  return (
    <div className={styles.main}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
