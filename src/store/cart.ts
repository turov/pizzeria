import { makeAutoObservable } from "mobx";
import { TCartItem } from "../types/types.ts";
import { getCartFromLS } from "../utils/getCartFromLS.ts";
import { calcCount, calcPrice } from "../utils/calcPriceAndCount.ts";

const cartData = getCartFromLS();

class Cart {
  items: TCartItem[] = cartData;

  get totalCount() {
    return calcCount(this.items);
  }

  get totalPrice() {
    return calcPrice(this.items);
  }

  constructor() {
    makeAutoObservable(this);
  }

  addItem = (value: TCartItem) => {
    const itemInCart = this.items.find(
      (item) => item.id === value.id && item.size === value.size,
    );
    if (itemInCart) {
      itemInCart.count++;
    } else {
      this.items.push({ ...value, count: 1 });
    }
  };

  removeItem = (value: TCartItem) => {
    const index = this.items.findIndex(
      (item) => item.id === value.id && item.size === value.size,
    );
    this.items[index].count === value.count || value.count === 0
      ? this.items.splice(index, 1)
      : this.items[index].count--;
  };

  clearCart = () => {
    this.items = [];
  };
}

export default new Cart();
