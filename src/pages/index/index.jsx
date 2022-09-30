import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "../../redux/store";
import { TYPE_SQUARE } from "../../constants";
import Map from "../../components/map";
import "./index.css";

const USERS = {
  USER_X: TYPE_SQUARE.X_TICK,
  USER_O: TYPE_SQUARE.O_TICK,
};

function Home() {
  const [clock, setClock] = useState({ mm: "00", ss: "00" });
  const [timer, setTimer] = useState(0);
  const [users, setUsers] = useState({
    [USERS.USER_X]: "",
    [USERS.USER_O]: "",
  });

  const { startGame, clearGame, isStart, step, endGame, isFinished } =
    useContext(GameContext);

  const handleOnClick = () => {
    if (isStart) return;
    if (!users[USERS.USER_X] || !users[USERS.USER_O]) {
      alert("Để bắt đầu game cần đủ 2 người chơi!");
    } else {
      handleStart();
    }
  };

  const handleOnChange = (e, user) => {
    setUsers({ ...users, [user]: e.target.value });
  };

  const handleStart = () => {
    const _time = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    startGame(users, _time);
  };

  const numberToStringTime = (number) => {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };

  useEffect(() => {
    endGame();
  }, [isFinished]);

  const handleEnd = () => {
    setClock({ mm: "00", ss: "00" });
    setTimer(0);
    clearGame();
  };

  useEffect(() => {
    const mm = Math.floor(timer / 60);
    if (mm === 20) {
      alert("Trò chơi kết thúc! Hoà!");
      handleEnd();
      return;
    }
    const ss = timer % 60;
    setClock({ mm: numberToStringTime(mm), ss: numberToStringTime(ss) });
  }, [timer]);

  return (
    <div>
      <div className="home__title">TRÒ CHƠI ĐÁNH CARO</div>
      {isStart && (
        <div className="home__description">
          Đã đánh được {step} dấu. Đến lượt của người chơi{" "}
          {step % 2 ? users[USERS.USER_O] : users[USERS.USER_X]}
        </div>
      )}
      {isFinished && (
        <div className="home__description">
          Người chơi {step % 2 ? users[USERS.USER_O] : users[USERS.USER_X]} đã
          chiến thắng vào giây thứ {timer}
        </div>
      )}
      <div className="home__header">
        <div className="home__header__info">
          <input
            className="input"
            placeholder="Nhập tên người chơi X"
            onChange={(e) => handleOnChange(e, USERS.USER_X)}
          />
          <input
            className="input"
            placeholder="Nhập tên người chơi Y"
            onChange={(e) => handleOnChange(e, USERS.USER_O)}
          />
          <div className="btn" onClick={handleOnClick}>
            Bắt đầu
          </div>
          <div className="btn" onClick={handleEnd}>
            Ấn để chơi lại
          </div>
        </div>
        <div className="home__header__clock">
          {clock.mm}:{clock.ss}
        </div>
      </div>
      <div className="home__game">
        <Map />
      </div>
    </div>
  );
}

export default Home;
