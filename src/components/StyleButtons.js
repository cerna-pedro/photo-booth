import React, { useRef } from "react";

const StyleButtons = ({ video }) => {
  const divRef = useRef();
  const filters = [
    `Invert`,
    `Sepia`,
    `Grayscale`,
    `Blur`,
    `Red`,
    `Green`,
    `Blue`,
    `Saturate`,
    `Reset`,
  ];
  const setFilter = e => {
    const buttons = Array.from(divRef.current.children);
    buttons.forEach(button => button.classList.remove("active"));
    video.current.className = e.target.innerText.toLowerCase();
    if (e.target.innerText !== "Reset") {
      e.target.classList.add("active");
    }
  };
  return (
    <div className="filterContainer" ref={divRef}>
      {filters.map((filter, i) => (
        <button
          key={i}
          className="filterButtons"
          type="button"
          onClick={setFilter}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default StyleButtons;
