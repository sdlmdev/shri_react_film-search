import { useState, useMemo, useCallback, FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Select.module.scss';
import { setGenre, setYear } from '@/entities/movie/model/movieSlice';
import { REVERSED_GENRES, REVERSED_YEARS } from '@/shared/lib/constants/filters';

interface SelectProps {
  label?: string;
  options: string[];
  onToggle?: () => void;
  contentPlaceholder?: string;
  isOpenSelect?: boolean;
}

export const Select: FC<SelectProps> = ({
  label,
  options,
  onToggle,
  contentPlaceholder = '',
  isOpenSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();

  const isDropdownOpen = isOpen || isOpenSelect;

  const toggleDropdown = useCallback(() => {
    if (isOpenSelect === undefined) {
      setIsOpen(!isOpen);
    }

    onToggle?.();
  }, [isOpen, isOpenSelect, onToggle]);

  const handleSelect = useCallback(
    (option: string) => {
      setSelectedOption(option);

      if (label === 'Жанр') {
        dispatch(setGenre(REVERSED_GENRES[option]));
      } else if (label === 'Год выпуска') {
        dispatch(setYear(REVERSED_YEARS[option]));
      }

      if (isOpenSelect === undefined) {
        setIsOpen(false);
      } else {
        onToggle?.();
      }
    },
    [dispatch, isOpenSelect, onToggle, label],
  );

  const renderedOptions = useMemo(
    () =>
      options.map((option) => (
        <li key={option} className={styles.option} onClick={() => handleSelect(option)}>
          {option}
        </li>
      )),
    [options, handleSelect],
  );

  return (
    <div className={styles.select}>
      {label && <span className={styles.label}>{label}</span>}
      <div
        onClick={toggleDropdown}
        className={`${styles.content}${isDropdownOpen ? ` ${styles.contentOpen}` : ''}`}
      >
        <input
          type="text"
          value={selectedOption}
          className={styles.input}
          placeholder={contentPlaceholder}
          readOnly
        />
        <button
          className={`${styles.toggle}${isDropdownOpen ? ` ${styles.toggleOpen}` : ''}`}
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        />
      </div>
      {isDropdownOpen && <ul className={styles.options}>{renderedOptions}</ul>}
    </div>
  );
};
