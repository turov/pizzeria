import React from "react";
import { observer } from "mobx-react-lite";
import debounce from "lodash.debounce";
import Filter from "../../store/filter.ts";
import Icon from "../Icon";
import styles from "./styles.module.css";

const Search: React.FC = observer(() => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");

  const updateSearchValue = React.useMemo(
    () =>
      debounce((value: string) => {
        Filter.setSearchValue(value);
      }, 1000),
    [],
  );

  const changeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const clearInput = function () {
    Filter.setSearchValue("");
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <Icon
        name="search"
        size="20"
        stroke="#E2E2E2"
        className={styles.searchIcon}
      />
      <input
        ref={inputRef}
        value={value}
        type="search"
        placeholder="Поиск пиццы..."
        className={styles.search}
        onChange={changeInputValue}
      />
      {value && (
        <button type="button" onClick={clearInput} className={styles.clear}>
          <Icon name="cross" size="20" stroke="#E2E2E2" />
        </button>
      )}
    </div>
  );
});

export default Search;
