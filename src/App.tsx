import "./App.css";
import React from "react";
import Header from "./components/Header";
import MainPage from "./pages/MainPage.tsx";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import CartPage from "./pages/CartPage.tsx";
const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header></Header>
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/cart" element={<CartPage></CartPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
