import React, { Component } from "react";
import "./playingField.css";

class PlayingField extends Component {
  state = {
    playingCell: [],
    playerWin: 0,
    computerWin: 0,
    winner: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.startGame && this.props.startGame !== prevProps.startGame) {
      this.setState({ winner: "" });
      this.choicePlayCell();
    }
  }

  choicePlayCell = () => {
    let arrayCellsNotPlay = this.props.arrayCells.filter(
      id => !this.state.playingCell.includes(id)
    );
    let indexForPlay = this.randomIndexOfCells(arrayCellsNotPlay.length - 1);
    let idPlayingCell = arrayCellsNotPlay[indexForPlay];
    let isWinner = this.winnerCheck();
    const playCell = document.getElementById(arrayCellsNotPlay[indexForPlay]);
    if (arrayCellsNotPlay.length > 0 && this.props.startGame) {
      if (!isWinner) {
        playCell.className = "cellChoice";
        this.setState(prevState => {
          return {
            playingCell: [...prevState.playingCell, idPlayingCell]
          };
        });
        this.timer(playCell);
      } else {
        console.log("Победа!!!");
        this.props.winnerRecord(this.state.winner);
        this.setState({ playerWin: 0, computerWin: 0 });
      }
    } else if (
      this.state.playerWin === this.state.computerWin &&
      arrayCellsNotPlay.length === 0
    ) {
      this.setState({ winner: "No Winner" });
      this.props.winnerRecord(this.state.winner);
    } else {
      console.log("повторно игру запустили");
      this.setState({ playerWin: 0, computerWin: 0 });
    }
  };

  winnerCheck = () => {
    const winnerRating =
      Math.floor((this.props.fieldSize * this.props.fieldSize) / 2) + 1;
    if (this.state.playerWin === winnerRating) {
      this.setState({ winner: this.props.userName });
      return true;
    } else if (this.state.computerWin === winnerRating) {
      this.setState({ winner: "Computer" });
      return true;
    } else {
      return false;
    }
  };

  randomIndexOfCells = max => {
    return Math.floor(Math.random() * (max + 1));
  };

  timer = playCell => {
    setTimeout(() => {
      this.playerLose(playCell);
    }, 2000);
    //  this.props.delay);
  };

  playerWin = e => {
    if (e.target.className === "cellChoice") {
      e.target.className = "cellWin";
      this.setState(prevstate => {
        return { playerWin: prevstate.playerWin + 1 };
      });
    }
  };

  playerLose = playCell => {
    if (playCell.className !== "cellWin") {
      playCell.className = "cellLose";
      this.setState(prevstate => {
        return { computerWin: prevstate.computerWin + 1 };
      });
    }
    this.choicePlayCell();
  };

  render() {
    const { winner } = this.state;
    const { fieldSize, arrayCells } = this.props;

    const inlineStyle = {
      gridTemplateColumns: `repeat(${fieldSize}, 1fr)`,
      gridTemplateRows: `repeat(${fieldSize}, 1fr)`
    };

    return (
      <div>
        <h2>
          Игрок - {this.state.playerWin} :: Комп - {this.state.computerWin}
        </h2>
        <div className="overleyTitle">{winner && <h2>{winner} is Win</h2>}</div>
        <div className="containerField" style={inlineStyle}>
          {arrayCells.map(cell => (
            <div
              key={cell}
              id={cell}
              onClick={this.playerWin}
              className="cellDefault"
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default PlayingField;
