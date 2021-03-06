import React from 'react';
import Board from './board.js';
import MoveList from './MoveList.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
    this.jumpTo = this.jumpTo.bind(this);
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  statusMessage(winner) {
    if (winner) {
      return "Winner: " + winner;
    } else if (this.state.stepNumber > 8) {
      return "It's a tie!"
    } else {
      return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const winningSquares = getWinningSquares(current.squares);
    const status = this.statusMessage(winner);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningSquares={winningSquares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <MoveList history={history} stepNumber={this.state.stepNumber} jumpTo={this.jumpTo} />
        </div>
      </div>
    );
  }
}

function getWinningSquares(squares) {
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
      return [a, b, c];
    }
  }
  return null;
}

function calculateWinner(squares) {
  const winningSquares = getWinningSquares(squares);
  if (winningSquares) {
    return squares[winningSquares[0]];
  }
  return null;
}
