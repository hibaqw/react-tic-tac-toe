
import React, { useCallback } from 'react';
import { useState } from 'react';


function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
export default function Board() {
  /** use state to track turns
   * sets X as default value
   */
  const [xIsNext, setXisNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function handleClick(i) {
    /*create copy of array
     * will use arrays to record game history
     * immutability
     * */
    const nextSquares = squares.slice();
    // if square is already filled exit out of function
    // can only mark empty squares
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    // code to alternate turns between player X and player O
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // set squares to new array
    setSquares(nextSquares);
    // change boolean
    setXisNext(!xIsNext);
  }



  return (
    <div>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>);
}

/**
 * 
 * @param {*} squares is an array containing the values of each square 
 * on the tic tac toe gamee board
 * calculates the winner of a single game of tic tac toe
 * returns either 'X' or 'O' based on which player won that game
 */
function calculateWinner(squares) {
  // array containing patterns of possible wins
  const lines = [[0, 1, 2],
  [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }

  }
  return null;
}
