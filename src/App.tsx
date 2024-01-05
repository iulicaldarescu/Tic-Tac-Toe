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
      {/* <Header turn={turn} />
       */}
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route
          path="/play"
          element={
            <>
              <Header turn={turn} />
              <BattleArea turn={turn} setTurn={setTurn} />{" "}
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
