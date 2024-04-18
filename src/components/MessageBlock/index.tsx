import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type MessageBlockProps = {
  text?: string;
  link?: boolean;
};

const MessageBlock: React.FC<MessageBlockProps> = ({ text, link }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{text}</h2>
      {link && (
        <Link to="/" className={styles.button}>
          Вернуться на главную
        </Link>
      )}
    </div>
  );
};

MessageBlock.defaultProps = {
  text: "Такой страницы нет 😢",
  link: true,
};

export default MessageBlock;
