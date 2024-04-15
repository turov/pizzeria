import React from "react";
import { observer } from "mobx-react-lite";
import Cart from "../store/cart.ts";
import CartItem from "../components/Cart/CartItem";
import CartHeader from "../components/Cart/CartHeader";
import CartFooter from "../components/Cart/CartFooter";
import MessageBlock from "../components/MessageBlock";

const CartPage: React.FC = observer(() => {
  const cartItems = Cart.items;

  if (cartItems.length < 1) {
    return <MessageBlock text="Ваша корзина пуста 🥺👉👈"></MessageBlock>;
  }

  return (
    <div className="container">
      <div className="cart">
        <CartHeader></CartHeader>
        <div>
          {cartItems.map((item) => (
            <CartItem pizza={item} key={item.id + "_" + item.size}></CartItem>
          ))}
        </div>
        <CartFooter></CartFooter>
      </div>
    </div>
  );
});

export default CartPage;
