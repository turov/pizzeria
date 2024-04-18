import React from "react";

type IconProps = {
  name: "cart" | "cross" | "minus" | "plus" | "search" | "trash";
  fill?: string;
  stroke?: string;
  size: string;
  className?: string;
};
const Icon: React.FC<IconProps> = React.memo(
  ({ name, fill, stroke, size, className }) => {
    return (
      <svg
        className={`${className}`}
        fill={fill}
        stroke={stroke}
        width={size}
        height={size}
      >
        <use xlinkHref={`sprite.svg#${name}`} />
      </svg>
    );
  },
);

export default Icon;
