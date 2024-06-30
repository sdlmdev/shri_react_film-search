import { FC, ChangeEvent, useState } from 'react';
import styles from './SearchInput.module.scss';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
}

export const SearchInput: FC<InputProps> = ({ placeholder = '', value = '', onChange, setValue }) => {
  const [isFocused, setIsFocused] = useState(false);

  const resetValue = () => {
    setValue('');
  };

  return (
    <div className={`${styles.container} ${isFocused ? styles.focused : ''}`}>
      <div className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value && (
        <button className={styles.clear} onClick={resetValue} />
      )}
    </div>
  );
};
