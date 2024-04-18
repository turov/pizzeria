export const getCartFromLS = () => {
  const data = localStorage.getItem("pizzeria-cart");
  if (!data) {
    return [];
  } else {
    return JSON.parse(data);
  }
};
