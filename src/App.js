import React, { Component } from "react";
import shortId from "shortid";
import Form from "./components/form/Form";
import PlayingField from "./components/playingField/PlayingField";
import LeaderBoard from "./components/leaderBoard/LeaderBoard";
import services from "./services";
var moment = require("moment");

class App extends Component {
  state = {
    winners: [],
    userName: "",
    optionsSelect: [],
    gameMode: {},
    selectMode: {},
    startGame: false,
    arrayCells: [],
    buttonPlay: "Play"
  };

  componentDidMount() {
    this.getGameMode();
    // this.getWinners();
  }
  componentDidUpdate() {}

  getGameMode = async () => {
    const gameMode = await services.getMode();
    const optionsSelect = Object.keys(gameMode);
    this.setState({ optionsSelect, gameMode });
  };

  getWinners = async () => {
    const winners = await services.getWinners();
    this.setState({ winners });
  };

  postWinner = async objWinner => {
    await services.postWinners(objWinner);
  };

  startPlay = userName => {
    // this.setState({ startGame: false });
    this.setState({
      userName,
      startGame: true
    });
  };

  drawField = selectMode => {
    const fieldSize = this.state.gameMode[selectMode];
    this.setState({
      selectMode: fieldSize,
      startGame: false
    });
    this.createArrayCells(fieldSize);
  };

  createArrayCells = ({ field }) => {
    let arrayCells = [];
    const arrayCellsLength = field * field;
    for (let i = 0; i < arrayCellsLength; i++) {
      arrayCells = [...arrayCells, shortId()];
    }
    this.setState({ arrayCells });
  };

  winnerRecord = async winner => {
    const idWinner = Math.random();
    const dateWinner = moment(new Date()).format("HH:mm DD MMMM YYYY");
    const objWinner = {
      id: idWinner,
      winner: winner,
      date: dateWinner
    };
    this.setState({ buttonPlay: "Play Again" });
    console.log("winner:", idWinner, winner, dateWinner);
    console.log("objWinner", objWinner);
    // await this.postWinner(objWinner);
    // await this.getWinners();
  };

  render() {
    const {
      optionsSelect,
      winners,
      selectMode,
      arrayCells,
      startGame,
      userName,
      buttonPlay
    } = this.state;
    return (
      <div>
        <Form
          optionsSelect={optionsSelect}
          startPlay={this.startPlay}
          drawField={this.drawField}
          buttonPlay={buttonPlay}
        />
        <PlayingField
          fieldSize={selectMode.field}
          arrayCells={arrayCells}
          playerMove={this.playerMove}
          delay={selectMode.delay}
          startGame={startGame}
          userName={userName}
          winnerRecord={this.winnerRecord}
        />
        <LeaderBoard winners={winners} />
      </div>
    );
  }
}

export default App;
