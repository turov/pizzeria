import React from "react";
import styles from "./styles.module.css";
import { TCartItem } from "../../../types/types.ts";
import Icon from "../../Icon";
import Cart from "../../../store/cart.ts";
import { observer } from "mobx-react-lite";

type CartItemProps = {
  pizza: TCartItem;
};
const CartItem: React.FC<CartItemProps> = observer(({ pizza }) => {
  const item: TCartItem = { ...pizza };

  const onClickIncrease = () => {
    Cart.addItem(item);
  };
  const onClickDecrease = () => {
    if (item.count > 1) {
      item.count--;
      Cart.removeItem(item);
    } else {
      Cart.removeItem(item);
    }
  };
  const onClickDelete = () => {
    Cart.removeItem(item);
  };

  return (
    <div className={styles.item}>
      <img
        className={styles.image}
        src={`/img/items/pizza_${pizza.id}.jpg`}
        alt="🍕"
      />
      <div className={styles.info}>
        {pizza.title} {pizza.size} см.
      </div>
      <div className={styles.count}>
        <button
          className={styles.buttonDecrease}
          type="button"
          onClick={onClickDecrease}
        >
          <Icon name="minus" size="20" stroke="#E2E2E2" />
        </button>
        <span>{pizza.count}</span>
        <button
          className={styles.buttonIncrease}
          type="button"
          onClick={onClickIncrease}
        >
          <Icon name="plus" size="20" stroke="#E2E2E2" />
        </button>
      </div>
      <div className={styles.price}>
        {(pizza.price * pizza.count).toLocaleString("ru")}&nbsp;₽
      </div>
      <button
        className={styles.buttonClose}
        type="button"
        onClick={onClickDelete}
      ></button>
    </div>
  );
});

export default CartItem;
