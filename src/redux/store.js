import React from "react";
import { gameActions } from "./action";
import gameReducer, { initialState } from "./reducer";

export const GameContext = React.createContext();

const GameProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(gameReducer, initialState);

  const value = {
    ...state,
    startGame: (users, timeStart) => {
      dispatch({ type: gameActions.START_GAME, users, timeStart });
    },
    clearGame: () => {
      dispatch({ type: gameActions.CLEAR_GAME });
    },
    tickSquare: (options) => {
      dispatch({ type: gameActions.TICK_SQUARE, options });
    },
    updateMap: () => {
      dispatch({ type: gameActions.UPDATE_MAP });
    },
    endGame: () => {
      dispatch({ type: gameActions.END_GAME });
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
