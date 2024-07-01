import { FC, useState } from 'react';
import { login } from '@/entities/session/model/sessionSlice'; // Импортируйте login thunk
import styles from './AuthForm.module.scss';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Popup } from '@/widgets/popup';
import { useAppDispatch } from '@/app/store';
import { setToken, clearToken } from '@/entities/session/model/sessionSlice';

interface AuthFormProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (value: boolean) => void;
}

export const AuthForm: FC<AuthFormProps> = ({ isPopupOpen, setIsPopupOpen }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    try {
      const actionResult = await dispatch(login({ username, password }));
      const token = actionResult.payload;
      
      if (token) {
        dispatch(setToken(token));
        handleClose();
      } else {
        console.error('Ошибка авторизации: токен не получен');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      dispatch(clearToken());
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setUsername('');
    setPassword('');
  };

  return (
    isPopupOpen && (
      <Popup isOpen={isPopupOpen} onClose={() => handleClose()}>
        <div className={styles.container}>
          <h3 className={styles.title}>Авторизация</h3>
          <div className={styles.inputList}>
            <Input
              label="Логин"
              placeholder="Введите логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isRequired
            />
            <Input
              label="Пароль"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              type="password"
            />
          </div>
          <div className={styles.buttons}>
            <Button text="Войти" onClick={handleLogin} />
            <Button text="Отменить" onClick={() => handleClose()} variant="outline" />
          </div>
        </div>
      </Popup>
    )
  );
};
