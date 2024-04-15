import { makeAutoObservable } from "mobx";
import { TSortType } from "../types/types.ts";
class Filter {
  category: number = 0;
  sortType: TSortType = { name: "популярности", type: "rating" };
  searchValue: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCategory = (value: number) => {
    this.category = value;
  };

  setSortType = (value: TSortType) => {
    this.sortType = value;
  };

  setSearchValue = (value: string) => {
    this.searchValue = value;
  };
}

export default new Filter();
