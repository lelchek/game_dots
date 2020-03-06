import React from "react";
import Winner from "./Winner";
import css from "./leaderBoard.module.css";

const LeaderBoard = ({ winners }) => (
  <div>
    <h2>Leader Board</h2>
    <ul className={css.list}>
      {winners.map(winner => (
        <Winner key={winner.id} winner={winner.winner} date={winner.date} />
      ))}
    </ul>
  </div>
);

export default LeaderBoard;
