import React from "react";
import { observer } from "mobx-react-lite";
import Cart from "../../store/cart.ts";
import { TCartItem, TPizza } from "../../types/types.ts";
import Icon from "../Icon";
import styles from "./PizzaInfo.module.css";

type PizzaInfoProps = {
  pizza: TPizza;
};

const PizzaInfo: React.FC<PizzaInfoProps> = observer(({ pizza }) => {
  const [activeType, setActiveType] = React.useState(0);
  const item: TCartItem = {
    id: pizza.id,
    title: pizza.title,
    price:
      pizza.types.length > 1
        ? pizza.types[activeType].price
        : pizza.types[0].price,
    size:
      pizza.types.length > 1
        ? pizza.types[activeType].size
        : pizza.types[0].size,
    count: 0,
  };

  const itemInCart = Cart.items.find(
    (x) => x.id === item.id && x.size === item.size && x.count > 0,
  );

  const onClickAdd = () => {
    Cart.addItem(item);
  };

  const onClickRemove = () => {
    if (item.count > 1) {
      item.count--;
      Cart.removeItem(item);
    } else {
      Cart.removeItem(item);
    }
  };

  return (
    <div className={styles.pizzaInfo}>
      <div className={styles.imageContainer}>
        <img src={`img/items/pizza_${pizza.id}.jpg`} alt="🍕" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{pizza.title}</h3>
        {pizza.description.map((x) => {
          return (
            <p key={x} className={styles.description}>
              {x}
            </p>
          );
        })}
        {pizza.types.length === 1 && (
          <p className={styles.description}>
            Доступна только в размере {pizza.types[0].size} см!
          </p>
        )}
        {pizza.types.length > 1 && (
          <div className={styles.selectorContainer}>
            <b>Размер</b>
            <ul>
              {pizza.types.map((type, index) => {
                return (
                  <li
                    key={type.size}
                    className={activeType === index ? styles.active : ""}
                    onClick={() => setActiveType(index)}
                  >
                    <span>{type.size}</span>
                    <i></i>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className={styles.buyContainer}>
          <div className={styles.buyButtonContainer}>
            {itemInCart ? (
              <div className={styles.buyButtonMultiple} onClick={onClickAdd}>
                <div onClick={(e) => e.stopPropagation()}>
                  <button className={styles.button} onClick={onClickRemove}>
                    <Icon
                      name="minus"
                      size="32"
                      stroke="#FFF"
                      className={styles.buttonIcon}
                    />
                  </button>
                </div>
                <span>
                  <span>{itemInCart.count}</span> × {itemInCart.price}&nbsp;₽
                </span>
                <button className={styles.button} onClick={onClickAdd}>
                  <Icon
                    name="plus"
                    size="32"
                    stroke="#FFF"
                    className={styles.buttonIcon}
                  />
                </button>
              </div>
            ) : (
              <button className={styles.buyButton} onClick={onClickAdd}>
                {pizza.types.length > 1
                  ? pizza.types[activeType].price
                  : pizza.types[0].price}
                &nbsp;₽
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PizzaInfo;
