import { useEffect, useState } from "react";
import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BattleArea({
  turn,
  setTurn,
  mainArray,
  setMainArray,
}: {
  turn: string;
  setTurn: (newTurn: string) => void;
  mainArray: string[];
  setMainArray: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const playerTurn = (param: string) => {
    if (param === "X") {
      return "O";
    }
    return "X";
  };

  //game mode param which comes from menu

  const { gameMode } = useParams();
  console.log(gameMode);

  const [xPlayer, setXplayer] = useState(0);
  const [tie, setTie] = useState(0);
  const [oPlayer, setOplayer] = useState(0);
  const [winner, setWinner] = useState("");
  const [isGameOn, setIsGameOn] = useState(true);
  const [isWinner, setIsWinner] = useState(false);

  const [isTie, setIsTie] = useState(false);

  // const cpuLogic = [
  //   [mainArray[0], mainArray[1]],
  //   [mainArray[0], mainArray[2]],
  //   [mainArray[1], mainArray[2]],

  //   [mainArray[3], mainArray[4]],
  //   [mainArray[3], mainArray[5]],
  //   [mainArray[4], mainArray[5]],

  //   [mainArray[0], mainArray[1]],
  //   [mainArray[0], mainArray[2]],
  //   [mainArray[1], mainArray[2]],

  //   [mainArray[6], mainArray[7]],
  //   [mainArray[6], mainArray[8]],
  //   [mainArray[7], mainArray[8]],

  //   [mainArray[0], mainArray[4]],
  //   [mainArray[0], mainArray[8]],
  //   [mainArray[4], mainArray[8]],

  //   [mainArray[2], mainArray[4]],
  //   [mainArray[2], mainArray[6]],
  //   [mainArray[4], mainArray[8]],

  //   [mainArray[0], mainArray[3]],
  //   [mainArray[0], mainArray[6]],
  //   [mainArray[3], mainArray[6]],

  //   [mainArray[1], mainArray[4]],
  //   [mainArray[1], mainArray[7]],
  //   [mainArray[4], mainArray[7]],

  //   [mainArray[2], mainArray[5]],
  //   [mainArray[2], mainArray[8]],
  //   [mainArray[5], mainArray[8]],
  // ];

  // player vs player
  const pvp = (param: number) => {
    setTurn(playerTurn(turn));

    const newArr = mainArray.map((item, index) => {
      if (index === param) {
        if (turn === "X") {
          item = iconX;
        } else {
          item = iconO;
        }
      }
      return item;
    });

    setMainArray(newArr);
  };

  // player vs cpu

  const pvc = (param: number) => {
    // player choice
    setTurn(playerTurn("X"));

    const newArr = mainArray.map((item, index) => {
      if (index === param) {
        item = iconX;
      }
      return item;
    });

    setMainArray(newArr);

    const emptyLocations: number[] = [];
    newArr.forEach((item, index) => {
      if (item === "") {
        emptyLocations.push(index);
      }
    });

    setTimeout(() => {
      // Check if the game is still on before making a move

      setMainArray((prev: string[]) => {
        const random = Math.floor(Math.random() * emptyLocations.length);

        const newArr = prev.map((item, index) => {
          if (
            index === emptyLocations[random] &&
            emptyLocations.includes(index)
          ) {
            item = iconO;
          }
          return item;
        });
        setTurn(playerTurn("O"));

        return newArr;
      });
    }, 1000);
  };

  // logic for figuring out who won

  useEffect(() => {
    let anyWinningConditionMet = false;
    const lines = [
      [mainArray?.[0], mainArray?.[1], mainArray?.[2]],
      [mainArray?.[3], mainArray?.[4], mainArray?.[5]],
      [mainArray?.[6], mainArray?.[7], mainArray?.[8]],
      [mainArray?.[0], mainArray?.[3], mainArray?.[6]],
      [mainArray?.[1], mainArray?.[4], mainArray?.[7]],
      [mainArray?.[2], mainArray?.[5], mainArray?.[8]],
      [mainArray?.[0], mainArray?.[4], mainArray?.[8]],
      [mainArray?.[2], mainArray?.[4], mainArray?.[6]],
    ];

    for (let line in lines) {
      const [a, b, c] = lines[line];

      if (a === b && a === c) {
        anyWinningConditionMet = true;
        if (a === iconX) {
          if (isGameOn) {
            setXplayer((prev) => prev + 1);
            setWinner("X");
            setIsWinner(true);
            setIsGameOn(false);
          }
        } else if (a === iconO) {
          if (isGameOn) {
            setOplayer((prev) => prev + 1);
            setWinner("O");
            setIsWinner(true);
            setIsGameOn(false);
          }
          return;
        }
      }
    }

    if (
      !anyWinningConditionMet &&
      mainArray &&
      mainArray.every((item) => item !== "") &&
      !isTie
    ) {
      // No winning condition met and all cells are filled
      setTie((prev) => prev + 1);
      setIsTie(true);
    }
  }, [mainArray]);

  // quit function

  const quitGame = () => {
    const emptyArray = mainArray.map((item) => {
      return (item = "");
    });
    setMainArray(emptyArray);

    setOplayer(0);
    setXplayer(0);
    setTie(0);
    setIsGameOn(true);
    setWinner("");
    setIsWinner(false);
  };

  // next round function

  const nextRound = () => {
    const emptyArray = mainArray.map((item) => {
      return (item = "");
    });

    setIsWinner(false);
    setIsGameOn(true);
    setMainArray(emptyArray);
  };

  return (
    <div className="md:w-2/3 lg:w-1/2 m-auto">
      {/* 9 squares */}
      <div className="pt-10">
        <div className="grid grid-cols-3 gap-8 place-items-center ">
          {mainArray?.map((item, index) => {
            return (
              <div
                onClick={
                  !item
                    ? () =>
                        `${
                          gameMode === "cpu"
                            ? pvc(index)
                            : gameMode === "player"
                            ? pvp(index)
                            : ""
                        }`
                    : undefined
                }
                className=" flex items-center justify-center py-5 rounded-lg
                 bg-[#1f3540] border-[#102129] custom-shadow w-[100px] h-[95px]"
                key={index}
              >
                {" "}
                <img src={item} alt=""></img>
              </div>
            );
          })}
        </div>
      </div>

      {isWinner && (
        <div className="bg-[#192a32] z-30 text-center absolute right-0 left-0 top-28 py-20">
          <p className="text-[#a9bec9] py-5">YOU WON</p>
          <p className="text-[#31c4be] font-bold">{winner} TAKES THE ROUND</p>
          <div className="flex gap-3 justify-center py-5 font-bold">
            <Link to={"/"}>
              <button
                className="bg-[#a8bec9] px-2 py-3 rounded-lg"
                onClick={quitGame}
              >
                QUIT
              </button>
            </Link>
            <button
              className="bg-[#f2b237] px-2 py-3 rounded-lg"
              onClick={nextRound}
            >
              NEXT ROUND
            </button>
          </div>
        </div>
      )}

      {/* score */}
      <div className="grid grid-cols-3 gap-8 place-items-center pt-10 text-[#192a32]">
        {/* left score */}
        <div className="bg-[#31c4be] flex items-center flex-col py-5 rounded-lg px-6 w-[100px] text-center">
          <p className="flex gap-2 font-semibold">
            <span>X</span> <span>(YOU)</span>
          </p>
          <p className="font-bold text-3xl">{xPlayer}</p>{" "}
        </div>
        {/* middle score */}
        <div className="bg-[#a8bec9] flex items-center flex-col py-5 rounded-lg px-6 w-[100px] text-center">
          <p className="flex gap-2 font-semibold">
            <span>TIES</span>
          </p>
          <p className="font-bold text-3xl">{tie}</p>{" "}
        </div>
        {/* right score */}
        <div className="bg-[#f2b237] flex items-center flex-col py-5 rounded-lg px-6 w-[100px] text-center">
          <p className="flex gap-2 font-semibold">
            <span>O</span> <span>(YOU)</span>
          </p>
          <p className="font-bold text-3xl">{oPlayer}</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default BattleArea;
