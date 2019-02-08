import React from 'react';

export default class MoveList extends React.Component {
  render() {
    const history = this.props.history;

    const moves = history.map((step, move) => {
      const desc = move ?
          'Go to move #' + move :
          'Go to game start';

      const disabled = this.props.stepNumber === move;
      const position = move ? getPosition(step.squares, history[move - 1].squares) : null;
      const coordinates = move ? coordinateString(position) : "";
      const coordinateClass = this.props.stepNumber === move ? "bold" : "";

      return(
          <li key={move}>
            <button onClick={() => this.props.jumpTo(move)} disabled={disabled}>{desc}</button>
            <span className={coordinateClass}>{coordinates}</span>
          </li>
      );
    });

    return <ol>{moves}</ol>;
  }
}

function coordinateString(position) {
  const column = Math.floor(position / 3) + 1;
  const row = (position) % 3 + 1;
  return "(" + column + ", " + row + ")";
}

function getPosition(currentSquares, previousSquares) {
  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i] !== previousSquares[i]) {
      return i;
    }
  }
}
