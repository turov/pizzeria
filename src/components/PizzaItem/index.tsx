import React from "react";
import { TPizza } from "../../types/types.ts";
import styles from "./styles.module.css";

type PizzaItemProps = {
  pizza: TPizza;
  openModal: (pizza: TPizza) => void;
};
const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, openModal }) => {
  return (
    <div className={styles.item} onClick={() => openModal(pizza)}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={`img/items/pizza_${pizza.id}.jpg`}
          alt="🍕"
        />
      </div>
      <h4 className={styles.title}>{pizza.title}</h4>
      <p className={styles.text}>{pizza.description[0]}</p>
      <div className={styles.footer}>
        <button className={styles.price}>
          {pizza.types.length > 1 && <>от </>} {pizza.types[0].price} ₽
        </button>
      </div>
    </div>
  );
};

export default PizzaItem;
