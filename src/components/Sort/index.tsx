import React from "react";
import {TSortType} from "../../types/types.ts";
import styles from "./styles.module.css";
import Filter from "../../store/filter.ts";
import {observer} from "mobx-react-lite";

const sortOptions: TSortType[] = [
    {name: "популярности", type: "rating"},
    {name: "цене", type: "minPrice"},
    {name: "названию", type: "title"},
];

const Sort: React.FC = observer(() => {
    const sortType = Filter.sortType;

    const [open, setOpen] = React.useState(false);
    const sortRef = React.useRef<HTMLDivElement>(null);

    const onEscKeydownHandler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    const outsideClickHandler = ({target}: MouseEvent) => {
        if (!sortRef.current?.contains(target as Node)) {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", outsideClickHandler);
        document.addEventListener("keydown", onEscKeydownHandler)
        return () => {
            document.removeEventListener("click", outsideClickHandler)
            document.removeEventListener("keydown", onEscKeydownHandler)
        };
    }, [outsideClickHandler, onEscKeydownHandler]);

    const onOptionClick = function (option: TSortType) {
        Filter.setSortType(option);
        setOpen(false);
    };

    return (
        <div className={styles.sort} ref={sortRef}>
            <div className={styles.sort__label}>
                <span>Сортировка по:</span>
                <span
                    onClick={() => setOpen(!open)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            setOpen(!open)
                        }
                    }}
                    tabIndex={0}
                >
                    {sortType.name}
                </span>
            </div>
            {open && (
                <div className={styles.sort__popup}>
                    <ul>
                        {sortOptions.map((option) => (
                            <li
                                key={option.type}
                                className={sortType.type === option.type ? styles.active : ""}
                                onClick={() => onOptionClick(option)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        onOptionClick(option)
                                    }
                                }}
                                tabIndex={0}
                            >
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

export default Sort;
