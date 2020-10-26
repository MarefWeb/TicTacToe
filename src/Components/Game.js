import React from 'react';
import Board from "./Board";

export default class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
        xIsNext: true
      }
    ],
    currentStep: 0
  }

  handleSquareChange = (i) => {
    const {history, currentStep} = this.state
    const currentHistory = history.slice(0, currentStep+1)
    const {squares, xIsNext} = currentHistory[currentStep]
    const squaresNew = [...squares]
    const next = !xIsNext
    squaresNew[i] = xIsNext ? 'X': 'O';
    currentHistory.push({
      squares: squaresNew,
      xIsNext: next,
    });

    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    this.setState({
      history: currentHistory,
      currentStep: currentStep + 1
    });
  };

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(move) {
    this.setState({
      currentStep: move
    });
  }

  render() {
    const {history, currentStep} = this.state
    const {squares, xIsNext} = history[currentStep]
    const winner = this.calculateWinner(squares)
    const moves = history.map( ({squares, xIsNext}, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
      );
    })
    let status;

    if(winner) {
      status = `Winner: ${winner}`;
    }
    else {
      status = 'Next player: ' + (xIsNext ? 'X': 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={this.handleSquareChange} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}