import "./App.css";
import Home from "./pages/index";
import GameProvider from "./redux/store";

function App() {
  return (
    <GameProvider>
      <Home />
    </GameProvider>
  );
}

export default App;
