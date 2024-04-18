import React from "react";
import { observer } from "mobx-react-lite";
import throttle from "lodash.throttle";
import Filter from "../store/filter.ts";
import Data from "../store/data.ts";
import { TPizza } from "../types/types.ts";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Skeleton";
import PizzaItem from "../components/PizzaItem";
import PizzaInfo from "../components/PizzaInfo";
import Modal from "../components/Modal";
import MessageBlock from "../components/MessageBlock";

const MainPage: React.FC = observer(() => {
  const { sortType, category, searchValue } = Filter;
  const { items, count, status, page } = Data;
  const [activePizza, setActivePizza] = React.useState<TPizza | null>(null);
  const sortingType = sortType.type;
  const prevPage = React.useRef(page);
  const prevSortingType = React.useRef(sortingType);
  const prevSearchValue = React.useRef(searchValue);
  const prevCategory = React.useRef(category);
  const openModal = function (pizza: TPizza) {
    setActivePizza(pizza);
  };

  const getData = React.useCallback(() => {
    Data.fetchData({
      page,
      sortingType,
      searchValue,
      category,
    }).then(r => r);
  }, [sortingType, searchValue, category, page]);

  React.useEffect(() => {
    const scrollHandler = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Document)) return;
      if (
        target.documentElement.scrollHeight -
          (target.documentElement.scrollTop + window.innerHeight) <
          50 &&
        items.length < count
      ) {
        if (items.length < count) {
          Data.setPage(page + 1);
        }
      }
    };

    const throttledScrollHandler = throttle(scrollHandler, 500);

    document.addEventListener("scroll", throttledScrollHandler);

    return function () {
      document.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [count, page, items.length]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    Data.resetData();
    return () => {
      Data.resetData();
    };
  }, []);

  React.useEffect(() => {
    if (
      sortingType !== prevSortingType.current ||
      searchValue !== prevSearchValue.current ||
      category !== prevCategory.current
    ) {
      prevCategory.current = category;
      prevSearchValue.current = searchValue;
      prevSortingType.current = sortingType;
      Data.resetData();
      if (prevPage.current === page) {
        getData();
      }
    } else {
      getData();
    }
  }, [sortingType, searchValue, category, page, getData]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories></Categories>
        <Sort></Sort>
      </div>
      {status === "error" && (
        <MessageBlock
          text={"Ошибка сервиса. Повторите запрос позднее 😵‍💫"}
          link={false}
        ></MessageBlock>
      )}
      {status === "success" && items.length === 0 && (
        <MessageBlock text={"Ничего не найдено 🫣"} link={false}></MessageBlock>
      )}
      <div className="content__items">
        {items?.map((pizza) => {
          return (
            <PizzaItem
              key={pizza.id}
              openModal={openModal}
              pizza={pizza}
            ></PizzaItem>
          );
        })}
        {status === "loading" &&
          [...new Array(4)].map((_, index) => (
            <Skeleton key={index}></Skeleton>
          ))}
      </div>
      <Modal active={!!activePizza} setClose={() => setActivePizza(null)}>
        {activePizza && <PizzaInfo pizza={activePizza}></PizzaInfo>}
      </Modal>
    </div>
  );
});

export default MainPage;
