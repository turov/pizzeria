import React from "react";
import styles from "./styles.module.css";
import Filter from "../../store/filter.ts";
import { observer } from "mobx-react-lite";

const availableCategories = ["Все", "Вегетарианские", "Острые️", "Без лука"];

const Categories: React.FC = observer(() => {
  const category = Filter.category;

  const onClickCategory = React.useCallback((index: number) => {
    Filter.setCategory(index);
  }, []);

  return (
    <div className={styles.categories}>
      <ul>
        {availableCategories.map((_category, index) => (
          <li
            key={_category}
            className={category === index ? `${styles.active}` : ""}
            onClick={() => onClickCategory(index)}
          >
            {_category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
