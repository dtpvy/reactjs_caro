import { type } from "@testing-library/user-event/dist/type";
import { memo, useCallback, useContext, useRef, useState } from "react";
import { TYPE_SQUARE, GAME } from "../../constants";
import { GameContext } from "../../redux/store";
import Square from "../square";
import "./index.css";

function Map({ handleFinished }) {
  let { size, map } = useContext(GameContext);

  // const handleOnClick = (x, y, type) => {
  //   const isFinished = checkFinished(x, y, type, size, map);
  //   console.log(isFinished);
  //   if (isFinished) handleFinished();
  // };

  return (
    <div
      className="map"
      style={{ gridTemplateColumns: `repeat(${size}, auto)` }}
    >
      {map.map(({ x, y, type }) => {
        return (
          <Square
            key={x * size + y}
            x={x}
            y={y}
            type={type}
            // onClick={handleOnClick}
          />
        );
      })}
    </div>
  );
}

export default memo(Map);
