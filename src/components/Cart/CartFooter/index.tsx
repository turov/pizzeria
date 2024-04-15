import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Cart from "../../../store/cart.ts";
import styles from "./styles.module.css";

const CartFooter: React.FC = observer(() => {
  const totalPrice = Cart.totalPrice.toLocaleString("ru");
  const totalCount = Cart.totalCount.toLocaleString("ru");
  return (
    <div className={styles.footer}>
      <div className={styles.details}>
        <span className={styles.totalCount}>
          Всего пицц: <b>{totalCount} шт.</b>
        </span>
        <span className={styles.totalPrice}>
          Сумма заказа: <b>{totalPrice} ₽</b>
        </span>
      </div>
      <div className={styles.buttons}>
        <Link to="/" className={`${styles.button} ${styles.buttonBack}`}>
          <span>Вернуться назад</span>
        </Link>
        <Link to="*" className={`${styles.button} ${styles.buttonPay}`}>
          <span>Оплатить сейчас</span>
        </Link>
      </div>
    </div>
  );
});

export default CartFooter;
