import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Popup: FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={e => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={onClose} />
      </div>
    </div>,
    document.getElementById('portal')!
  );
};