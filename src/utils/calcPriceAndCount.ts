import { TCartItem } from "../types/types.ts";

export const calcPrice = (items: TCartItem[]) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);
};

export const calcCount = (items: TCartItem[]) => {
  return items.reduce((acc, item) => {
    return acc + item.count;
  }, 0);
};
