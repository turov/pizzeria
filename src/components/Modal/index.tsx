import React from "react";
import styles from "./styles.module.css";
import Icon from "../Icon";

type ModalProps = {
  active: boolean;
  setClose: () => void;
  children: React.JSX.Element | null;
};
const Modal: React.FC<ModalProps> = ({ active, setClose, children }) => {
  return (
    <div
      className={
        active ? `${styles.modal} ${styles.active}` : `${styles.modal}`
      }
      onClick={setClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={setClose} type="button">
          <Icon
            name="cross"
            size="24"
            stroke="#2A272A"
            className={styles.iconClose}
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
