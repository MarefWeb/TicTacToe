import React from 'react';

function Square({onClick, value, i}) {
  return (
    <button
      className="square"
      onClick={() => onClick(i)}
    >
      {value}
    </button>
  );
}

export default Square;