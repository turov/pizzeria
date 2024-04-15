import React from "react";
import { observer } from "mobx-react-lite";
import Cart from "../../../store/cart.ts";
import styles from "./styles.module.css";
import Icon from "../../Icon";

const CartHeader: React.FC = observer(() => {
  const onClickClearCart = () => {
    Cart.clearCart();
  };
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        <Icon name="cart" size="30" stroke="#E2E2E2" />
        <span>Корзина</span>
      </h2>
      <button className={styles.clear} onClick={onClickClearCart} type="button">
        <Icon name="trash" size="20" stroke="#E2E2E2" />
        <span>Очистить корзину</span>
      </button>
    </div>
  );
});

export default CartHeader;
