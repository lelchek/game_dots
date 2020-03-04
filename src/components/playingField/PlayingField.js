import React from "react";
import css from "./playingField.module.css";

const PlayingField = ({ fieldSize }) => {
  const inlineStyle = {
    gridTemplateColumns: `repeat(${fieldSize}, 1fr)`,
    gridTemplateRows: `repeat(${fieldSize}, 1fr)`
  };

  //   console.log("fieldSize", fieldSize);
  return (
    <div>
      <h2>Playing Field</h2>
      <div className={css.container} style={inlineStyle}>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  );
};

export default PlayingField;
