import { FC, ChangeEvent } from 'react';
import styles from './Input.module.scss';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
}

export const Input: FC<InputProps> = ({
  placeholder = '',
  value = '',
  onChange,
  label,
  isRequired = false,
  type = 'text',
}) => {
  return (
    <div className={styles.container}>
      {label && (
        <span className={styles.label}>
          {label}
          {isRequired && <span className={styles.marker}> *</span>}
        </span>
      )}
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        type={type}
        required={isRequired}
      />
    </div>
  );
};
