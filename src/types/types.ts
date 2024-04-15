type TPizzaParams = {
  size: number;
  price: number;
};

export type TPizza = {
  id: string;
  title: string;
  description: string[];
  types: TPizzaParams[];
  category: number[];
  rating: number;
};

export type TSortType = { name: string; type: "rating" | "title" | "minPrice" };

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  size: number;
  count: number;
};

export type TDataResponse = {
  count: number;
  items: TPizza[];
};

export type TQueryParams = {
  page: number;
  sortingType: string;
  searchValue: string;
  category: number;
};
