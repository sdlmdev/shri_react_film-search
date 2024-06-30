import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>Страница не найдена</p>
      </div>
    </div>
  );
};
