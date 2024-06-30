import { FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  text: string;
  id?: string;
}

export const Button: FC<ButtonProps> = ({
  variant = 'default',
  text = '',
  onClick,
  id,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      id={id}
    >
      {text}
    </button>
  )
};
