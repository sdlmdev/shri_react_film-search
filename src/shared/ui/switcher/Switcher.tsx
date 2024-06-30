import { MouseEvent, FC } from 'react';
import styles from './Switcher.module.scss';
import cn from 'classnames';

interface SwitcherProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLeft?: boolean;
  isSmall?: boolean;
  isDisable?: boolean;
  className?: string;
}

export const Switcher: FC<SwitcherProps> = ({ onClick, isLeft = false, isSmall = false, isDisable, className }) => {
  return (
    <button
      type="button"
      className={cn(styles.switcher, { 
        [styles.left]: isLeft, 
        [styles.right]: !isLeft,
        [styles.small]: isSmall,
        [styles.disable]: isDisable,
      }, className)}
      onClick={onClick}
      disabled={isDisable}
    />
  );
};