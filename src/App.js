import React, { Component } from "react";
import Form from "./components/form/Form";
import PlayingField from "./components/playingField/PlayingField";
import LeaderBoard from "./components/leaderBoard/LeaderBoard";
import services from "./services";

class App extends Component {
  state = {
    winners: [],
    userName: "",
    optionsSelect: [],
    gameMode: {},
    selectMode: {},
    winnerThisGame: "",
    startGame: false
  };

  componentDidMount() {
    this.getGameMode();
    this.getWinners();
  }

  getGameMode = async () => {
    const gameMode = await services.getMode();
    const optionsSelect = Object.keys(gameMode);
    this.setState({ optionsSelect, gameMode });
  };

  getWinners = async () => {
    const winners = await services.getWinners();
    this.setState({ winners });
  };

  startPlay = (selectMode, userName) => {
    const fieldSize = this.state.gameMode[selectMode];
    this.createArrayCells(fieldSize);
    this.setState({
      userName,
      selectMode: fieldSize,
      startGame: true
    });
  };

  createArrayCells = ({ field }) => {
    const arrayCellsLength = field * field;
    console.log("arrayCells", arrayCellsLength);
  };

  // getFieldSize = gameMode => {};

  render() {
    const { optionsSelect, winners, selectMode } = this.state;
    return (
      <div>
        <Form optionsSelect={optionsSelect} startPlay={this.startPlay} />
        <PlayingField fieldSize={selectMode.field} />
        <LeaderBoard winners={winners} />
      </div>
    );
  }
}

export default App;
