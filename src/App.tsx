import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BattleArea from "./components/BattleArea";

function App() {
  const [turn, setTurn] = useState<string>("X");

  return (
    <div>
      <Header turn={turn} />
      <BattleArea turn={turn} setTurn={setTurn} />
    </div>
  );
}

export default App;
