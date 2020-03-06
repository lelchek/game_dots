import React from "react";
import css from "./leaderBoard.module.css";

const Winner = ({ winner, date }) => (
  <>
    <li className={css.item}>
      <span className={css.span}>{winner}</span>
      <span className={css.span}>{date}</span>
    </li>
  </>
);

export default Winner;
