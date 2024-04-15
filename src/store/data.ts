import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { TPizza, TQueryParams } from "../types/types.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

const enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

const getData = async (params: TQueryParams) => {
  const query =
    BASE_URL +
    `?_limit=4` +
    `&_page=${params.page}` +
    `&_start=0` +
    `${
      params.sortingType === "rating"
        ? `&_sort=${params.sortingType}&_order=desc`
        : `&_sort=${params.sortingType}&_order=asc`
    }` +
    `${params.searchValue ? `&q=${params.searchValue}` : ""}` +
    `${params.category !== 0 ? `&category_like=${params.category}` : ""}`;
  const response = await axios.get<TPizza[]>(query);
  return {
    items: response.data,
    count: response.headers["x-total-count"],
  };
};

class Data {
  items: TPizza[] = [];
  count: number = 0;
  page: number = 1;
  status: Status = Status.LOADING;

  constructor() {
    makeAutoObservable(this);
  }

  resetData = () => {
    this.items = [];
    this.count = 0;
    this.page = 1;
  };

  setPage = (value: number) => {
    this.page = value;
  };

  fetchData = async (params: TQueryParams) => {
    try {
      this.status = Status.LOADING;
      const res = await getData(params);
      // Таймаут нужен только для отображения скелетона при быстрой загрузке данных
      setTimeout(() => {
        runInAction(() => {
          this.items = [...this.items, ...res.items];
          this.count = res.count;
          this.status = Status.SUCCESS;
        });
      }, 1000);
    } catch {
      this.items = [];
      this.count = 0;
      this.status = Status.ERROR;
    }
  };
}

export default new Data();
