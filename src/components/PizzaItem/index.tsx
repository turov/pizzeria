import React from "react";
import {TPizza} from "../../types/types.ts";
import styles from "./styles.module.css";

type PizzaItemProps = {
    pizza: TPizza;
    openModal: (pizza: TPizza) => void;
};
const PizzaItem: React.FC<PizzaItemProps> = ({pizza, openModal}) => {
    return (
        <figure className={styles.item} onClick={() => openModal(pizza)}>
            <img
                className={styles.image}
                src={`img/items/pizza_${pizza.id}.jpg`}
                alt="🍕"
            />
            <figcaption>
                <h4 className={styles.title}>{pizza.title}</h4>
                <p className={styles.text}>{pizza.description[0]}</p>
                <button className={styles.price}>
                    {pizza.types.length > 1 && <>от </>} {pizza.types[0].price} ₽
                </button>
            </figcaption>
        </figure>
    );
};

export default PizzaItem;
