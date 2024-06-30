import { useState } from 'react';
import styles from './Filter.module.scss';
import { Select } from '@/shared/ui/select';
import { FILTER_OPTIONS } from '@/shared/lib/constants/filters';

export const Filter = () => {
  const [openSelectKey, setOpenSelectKey] = useState('');

  const handleSelectToggle = (key: string) => {
    if (openSelectKey === key) {
      setOpenSelectKey('');
    } else {
      setOpenSelectKey(key);
    }
  };

  return (
    <div className={styles.filter}>
      <h3 className={styles.title}>Фильтр</h3>
      {FILTER_OPTIONS.map((option) => (
        <Select
          key={option.label}
          label={option.label}
          options={Object.values(option.options)}
          contentPlaceholder={option.placeholder}
          isOpenSelect={openSelectKey === option.label}
          onToggle={() => handleSelectToggle(option.label)}
        />
      ))}
    </div>
  );
};
