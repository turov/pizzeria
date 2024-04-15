export const getCartFromLS = () => {
  const data = localStorage.getItem("react-pizza-cart");
  if (!data) {
    return [];
  } else {
    return JSON.parse(data);
  }
};
