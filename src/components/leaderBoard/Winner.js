import React from "react";

const Winner = ({ winner, date }) => (
  <>
    <li>
      <span>{winner}</span>
      <span>{date}</span>
    </li>
  </>
);

export default Winner;
