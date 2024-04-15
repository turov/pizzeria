import React from "react";

const Skeleton: React.FC = () => {
  const style: React.CSSProperties = {
    fill: `url("#fill")`,
  };

  return (
    <svg
      role="img"
      width="280"
      height="430"
      aria-labelledby="loading-aria"
      viewBox="0 0 280 430"
      preserveAspectRatio="none"
    >
      <title id="loading-aria">Загрузка...</title>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#clip-path)"
        style={style}
      ></rect>
      <defs>
        <clipPath id="clip-path">
          <rect x="0" y="0" rx="12" ry="12" width="280" height="280" />
          <rect x="0" y="302" rx="2" ry="2" width="280" height="16" />
          <rect x="0" y="336" rx="2" ry="2" width="280" height="28" />
          <rect x="0" y="384" rx="8" ry="8" width="104" height="45" />
        </clipPath>
        <linearGradient id="fill">
          <stop offset="0.599964" stopColor="#4b4a54" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="1.59996" stopColor="#6C6B75" stopOpacity="1">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>
          <stop offset="2.59996" stopColor="#4b4a54" stopOpacity="1">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Skeleton;
