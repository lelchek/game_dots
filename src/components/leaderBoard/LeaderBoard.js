import React from "react";
import Winner from "./Winner";

const LeaderBoard = ({ winners }) => (
  <div>
    <h2>Leader Board</h2>
    <ul>
      {winners.map(winner => (
        <Winner key={winner.id} winner={winner.winner} date={winner.date} />
      ))}
    </ul>
  </div>
);

export default LeaderBoard;
