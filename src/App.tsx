import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BattleArea from "./components/BattleArea";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";

function App() {
  const [turn, setTurn] = useState<string>("X");

  return (
    <div>
      <Menu></Menu>
      {/* <Header turn={turn} />
       */}
      <Routes>
        <Route
          path="/play-cpu"
          element={<BattleArea turn={turn} setTurn={setTurn} />}
        ></Route>
        <Route path="/play-player"></Route>
      </Routes>
    </div>
  );
}

export default App;
