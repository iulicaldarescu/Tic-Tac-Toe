import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BattleArea from "./components/BattleArea";
import Menu from "./components/Menu";
import { Route, Routes } from "react-router-dom";

function App() {
  const [turn, setTurn] = useState<string>("X");
  const [mainArray, setMainArray] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const restart = () => {
    const newArr = mainArray.map(() => "");
    setMainArray(newArr);
  };

  return (
    <div>
      {/* <Header turn={turn} />
       */}
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route
          path="/:gameMode"
          element={
            <>
              <Header turn={turn} mainArray={mainArray} res={restart} />
              <BattleArea
                turn={turn}
                setTurn={setTurn}
                mainArray={mainArray}
                setMainArray={setMainArray}
              />{" "}
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
