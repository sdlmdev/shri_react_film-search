import { useState } from 'react';
import styles from './Header.module.scss';
import { Logo } from '@/shared/ui/logo';
import { Button } from '@/shared/ui/button';
import { AuthForm } from '@/widgets/authForm';
import { useAppDispatch } from '@/app/store';
import { useSelector } from 'react-redux';
import { clearToken } from '@/entities/session/model/sessionSlice';
import { RootState } from '@/shared/lib/types/types';

export const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.session.isLogin);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      dispatch(clearToken());
    } else {
      setIsPopupOpen(true);
    }
  };

  return (
    <header className={styles.header}>
      <Logo />
      <Button id="auth-btn" text={isLoggedIn ? "Выйти" : "Войти"} onClick={handleButtonClick} />
      <AuthForm isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} />
    </header>
  );
};