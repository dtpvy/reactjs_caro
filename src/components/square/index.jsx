import { useState, useContext } from "react";
import { TYPE_SQUARE } from "../../constants";
import { GameContext } from "../../redux/store";
import "./index.css";

function XIcon() {
  return <div className=" square__icon square__icon--x">X</div>;
}

function OIcon() {
  return <div className="square__icon square__icon--o">O</div>;
}

function Square({ type, x, y, onClick }) {
  const { isStart, step, tickSquare, size, updateMap } =
    useContext(GameContext);

  const handleOnClick = () => {
    if (!isStart) return;
    if (type) return;
    const newType = step % 2 ? TYPE_SQUARE.O_TICK : TYPE_SQUARE.X_TICK;
    tickSquare({ x, y, type: newType });
    // onClick(x, y, newType);
    if (x + 1 >= size - 1 || y + 1 >= size - 1) {
      updateMap();
    }
  };

  return (
    <div className="square" onClick={handleOnClick}>
      {type === TYPE_SQUARE.X_TICK && <XIcon />}
      {type === TYPE_SQUARE.O_TICK && <OIcon />}
    </div>
  );
}

export default Square;
