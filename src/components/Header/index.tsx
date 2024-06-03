import React from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Search from "../Search";
import Icon from "../Icon";
import {useLocation} from "react-router-dom";
import Cart from "../../store/cart.ts";

const Header: React.FC = observer(() => {
    const totalPrice = Cart.totalPrice.toLocaleString("ru");
    const totalCount = Cart.totalCount.toLocaleString("ru");
    const items = Cart.items.slice(0);
    const isMounted = React.useRef(false);
    const location = useLocation();

    React.useEffect(() => {
        if (isMounted.current) {
            const data = JSON.stringify(items);
            localStorage.setItem("pizzeria-cart", data);
        }
        isMounted.current = true;
    }, [items]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <img
                        width="124"
                        height="64"
                        src={`img/logo.png`}
                        alt="Pizzeria Napoletana"
                    />
                </Link>
                {location.pathname === "/" && (
                    <div className={styles.search}>
                        <Search></Search>
                    </div>
                )}
                <Link to="/cart" className={styles.cart}>
                    <output className={styles.price}>{totalPrice}&nbsp;₽</output>
                    <div className={styles.count}>
                        <Icon
                            name="cart"
                            stroke="#E2E2E2"
                            size="24"
                            className={styles.cartIcon}
                        />
                        <output>{totalCount}</output>
                    </div>
                </Link>
            </div>
        </header>
    );
});

export default Header;
