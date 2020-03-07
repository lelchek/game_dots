import React, { Component } from "react";
import shortId from "shortid";
import FormGame from "./components/formGame/FormGame";
import PlayingField from "./components/playingField/PlayingField";
import LeaderBoard from "./components/leaderBoard/LeaderBoard";
import services from "./services";
import css from "./app.module.css";
var moment = require("moment");

class App extends Component {
  state = {
    winners: [],
    userName: "",
    optionsSelect: [],
    gameMode: {},
    selectMode: {},
    selectModeSelect: "",
    startGame: false,
    arrayCells: [],
    buttonPlay: "Play"
  };

  componentDidMount() {
    this.getGameMode();
    this.getWinners();
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
    this.drawField(this.state.selectModeSelect);
    this.setState({
      userName,
      startGame: true
    });
  };

  stopPlay = () => {
    this.setState({ startGame: false });
  };

  drawField = selectModeSelect => {
    const fieldSize = this.state.gameMode[selectModeSelect];
    this.setState({
      selectModeSelect,
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
    this.stopPlay();
    await this.postWinner(objWinner);
    await this.getWinners();
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
      <div className={css.containerApp}>
        <div className={css.playingFieldOverley}>
          <FormGame
            optionsSelect={optionsSelect}
            startPlay={this.startPlay}
            drawField={this.drawField}
            buttonPlay={buttonPlay}
            disabled={startGame}
          />
          <PlayingField
            fieldSize={selectMode.field}
            arrayCells={arrayCells}
            playerMove={this.playerMove}
            delay={selectMode.delay}
            startGame={startGame}
            userName={userName}
            winnerRecord={this.winnerRecord}
            stopPlay={this.stopPlay}
          />
        </div>
        <LeaderBoard winners={winners} />
      </div>
    );
  }
}

export default App;
