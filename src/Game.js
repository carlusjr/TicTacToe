import { useState } from "react";
import Board from "./components/Board";
import "./Game.css"

export default function Game() {

  const [gameState, setGameState] = useState({
    history: [{
      squares: Array(9).fill(null),
    }],    
    stepNumber: 0,
    xIsNext: true,
    status: "Next player: X",
  })

  function updateStatus(squares, xIsNext) {    
    const status = "Next player: " + (xIsNext ? 'X' : 'O');
    const winner = calculateWinner(squares);
    if (winner) {
      return "Winner: " + winner
    }
    return status;
  }

  function handleClick(i) {    
    const history = gameState.history.slice(0, gameState.stepNumber + 1);
    console.log(history);
    const current = history[gameState.stepNumber];    
    const newSquares = current.squares.slice();
    if (calculateWinner(newSquares)) {
      return;
    }
    const newXisNext = !gameState.xIsNext;    
    newSquares[i] = (gameState.xIsNext ? 'X' : 'O');
    setGameState({
      history: history.concat([{
        squares: newSquares,
      }]),
      stepNumber: history.length,
      xIsNext: newXisNext,
      status: updateStatus(newSquares, newXisNext),
    });    
  }  

  function jumpTo(step) {    
    setGameState({
      ...gameState,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  function addHistoryStep(step, move) {
    const desc = move ?
        'Go to move #' + move :
        'Go to game start';
    return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={gameState.history[gameState.stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{gameState.status}</div>
        <ol>
          {gameState.history.map( (step, move) => addHistoryStep(step, move))}
        </ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
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