import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('tictactoeScores'));
    if (savedScores) {
      setScores(savedScores);
    }
  }, []);

  const saveScores = (newScores) => {
    localStorage.setItem('tictactoeScores', JSON.stringify(newScores));
    setScores(newScores);
  };

  const calculateWinner = (squares) => {
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
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      const newScores = { ...scores, [winner]: scores[winner] + 1 };
      saveScores(newScores);
    }
  };

  const renderSquare = (i) => (
    <button
      className={`w-20 h-20 border border-gray-300 text-4xl font-bold focus:outline-none
        ${board[i] === 'X' ? 'bg-black text-white' : 
          board[i] === 'O' ? 'bg-white text-black' : 'bg-gray-200'}`}
      onClick={() => handleClick(i)}
    >
      {board[i]}
    </button>
  );

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetScores = () => {
    const newScores = { X: 0, O: 0 };
    saveScores(newScores);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
      <h1 className='text-4xl' >Tic-Tac-Toe</h1>

      <div className="mb-4 text-2xl font-bold text-white">{status}</div>
      <div className="grid grid-cols-3 gap-2 bg-gray-100 p-4 rounded-lg shadow-md">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => renderSquare(i))}
      </div>
      <div className="mt-4 text-xl text-white">
        <p>X Wins: {scores.X}</p>
        <p>O Wins: {scores.O}</p>
      </div>
      <div className="mt-4 space-x-4">
        <button className="btn btn-primary" onClick={resetGame}>
          Reset Game
        </button>
        <button className="btn btn-secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
      <h1>I love TicTacToe</h1>
    </div>
  );
};

export default TicTacToe;