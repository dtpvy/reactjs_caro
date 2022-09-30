import { gameActions } from "./action";
import { TYPE_SQUARE } from "../constants";

const GAME_SIZE = 30;

export const initialState = {
  map: [],
  users: {
    [TYPE_SQUARE.X_TICK]: "",
    [TYPE_SQUARE.O_TICK]: "",
  },
  step: 0,
  timeStart: 0,
  size: GAME_SIZE,
  isStart: false,
  isFinished: false,
};

const checkFinished = (x, y, type, size, map) => {
  let cnt = 0;
  const otherType =
    type === TYPE_SQUARE.X_TICK ? TYPE_SQUARE.O_TICK : TYPE_SQUARE.X_TICK;
  for (let i = Math.max(0, y - 6); i < Math.min(size, y + 6); i++) {
    if (map[x * size + i].type === type) {
      cnt++;
      if (cnt > 5) return true;
    } else if (map[x * size + i].type === otherType) {
      if (cnt === 5 && map[x * size + Math.max(0, i - 6)].type !== otherType) {
        return true;
      }
      cnt = 0;
    } else if (cnt === 5) {
      return true;
    } else {
      cnt = 0;
    }
  }
  cnt = 0;
  for (let i = Math.max(0, x - 6); i < Math.min(size, x + 6); i++) {
    if (map[i * size + y].type === type) {
      cnt++;
      if (cnt > 5) return true;
    } else if (map[i * size + y].type !== "") {
      if (cnt === 5 && map[Math.max(0, i - 6) * size + y].type !== otherType) {
        return true;
      }
      cnt = 0;
    } else if (cnt === 5) {
      return true;
    } else {
      cnt = 0;
    }
  }
  cnt = 0;
  for (let i = -6; i < 6; i++) {
    const _x = x + i;
    const _y = y + i;
    if (_x < 0 || _y < 0 || _x >= size || _y >= size) continue;
    if (map[_x * size + _y].type === type) {
      cnt++;
      if (cnt > 5) return true;
    } else if (map[_x * size + _y].type !== "") {
      if (
        cnt === 5 &&
        map[Math.max(0, _x - 6) * size + Math.max(0, _y - 6)].type !== otherType
      ) {
        return true;
      }
      cnt = 0;
    } else if (cnt === 5) {
      return true;
    } else {
      cnt = 0;
    }
  }
  cnt = 0;
  for (let i = -6; i < 6; i++) {
    const _x = x - i;
    const _y = y + i;
    if (_x < 0 || _y < 0 || _x >= size || _y >= size) continue;
    if (map[_x * size + _y].type === type) {
      cnt++;
      if (cnt > 5) return true;
    } else if (map[_x * size + _y].type !== "") {
      if (
        cnt === 5 &&
        map[Math.max(0, _x + 6) * size + Math.max(0, _y - 6)].type !== otherType
      ) {
        return true;
      }
      cnt = 0;
    } else if (cnt === 5) {
      return true;
    } else {
      cnt = 0;
    }
  }
  return false;
};

const initMap = (size) => {
  let map = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      map.push({
        x: i,
        y: j,
        type: "",
      });
    }
  }
  return map;
};

const gameReducer = (state, action) => {
  const { type, users, options, timeStart } = action;
  switch (type) {
    case gameActions.START_GAME: {
      return {
        ...state,
        users,
        timeStart,
        isStart: true,
        map: [...initMap(state.size)],
      };
    }
    case gameActions.UPDATE_MAP: {
      const newSize = state.size + 30;
      const newMap = initMap(newSize);
      for (let i = 0; i < state.size; i++) {
        for (let j = 0; j < state.size; j++) {
          newMap[i * newSize + j].type = state.map[i * state.size + j].type;
        }
      }
      return {
        ...state,
        size: newSize,
        map: [...newMap],
      };
    }
    case gameActions.TICK_SQUARE: {
      const { x, y, type } = options;
      const { map, size, step } = state;
      map[x * size + y] = {
        ...map[x * size + y],
        type,
      };
      const isFinished = checkFinished(x, y, type, size, map);
      return {
        ...state,
        step: step + 1,
        map,
        isFinished,
      };
    }
    case gameActions.CLEAR_GAME: {
      clearInterval(state.timeStart);
      return {
        ...initialState,
      };
    }
    case gameActions.END_GAME: {
      clearInterval(state.timeStart);
      return {
        ...state,
        isStart: false,
      };
    }
    default:
      return state;
  }
};

export default gameReducer;
