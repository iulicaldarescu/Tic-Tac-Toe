import { useEffect, useState } from "react";
import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";

function BattleArea({
  turn,
  setTurn,
}: {
  turn: string;
  setTurn: (newTurn: string) => void;
}) {
  const playerTurn = (ceva: string) => {
    if (ceva === "X") {
      return "O";
    }
    return "X";
  };

  const [mainArray, setMainArray] = useState([
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
  // const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleClick = (param: number) => {
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

  // useEffect(() => {
  //   if (
  //     (mainArray[0] && mainArray[1] && mainArray[2]) === iconO ||
  //     (mainArray[0] && mainArray[1] && mainArray[2]) === iconX
  //   ) {
  //     console.log("muie la neamuri");
  //   }
  // }, [mainArray]);

  useEffect(() => {
    const lines = [
      [mainArray[0], mainArray[1], mainArray[2]],
      [mainArray[3], mainArray[4], mainArray[5]],
      [mainArray[6], mainArray[7], mainArray[8]],
      [mainArray[0], mainArray[3], mainArray[6]],
      [mainArray[1], mainArray[4], mainArray[7]],
      [mainArray[2], mainArray[5], mainArray[8]],
      [mainArray[0], mainArray[4], mainArray[8]],
      [mainArray[2], mainArray[4], mainArray[6]],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (a === b && a === c) {
        if (a === iconX) {
          console.log("esti un mare putoi");
        } else if (a === iconO) {
          console.log("esti un mare puloi");
        }
      }
    }
  }, [mainArray]);

  return (
    <div className="md:w-2/3 lg:w-1/2 m-auto">
      {/* 9 squares */}
      <div className="pt-10">
        <div className="grid grid-cols-3 gap-8 place-items-center ">
          {mainArray.map((item, index) => {
            return (
              <div
                onClick={!item ? () => handleClick(index) : undefined}
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

      {/* score */}
      <div className="grid grid-cols-3 gap-8 place-items-center pt-10 text-[#192a32]">
        {/* left score */}
        <div className="bg-[#31c4be] flex items-center flex-col py-5 rounded-lg px-6 w-[100px] text-center">
          <p className="flex gap-2 font-semibold">
            <span>X</span> <span>(YOU)</span>
          </p>
          <p className="font-bold text-3xl">14</p>{" "}
        </div>
        {/* middle score */}
        <div className="bg-[#a8bec9] flex items-center flex-col py-5 rounded-lg px-6 w-[100px] text-center">
          <p className="flex gap-2 font-semibold">
            <span>TIES</span>
          </p>
          <p className="font-bold text-3xl">14</p>{" "}
        </div>
        {/* right score */}
        <div className="bg-[#f2b237] flex items-center flex-col py-5 rounded-lg px-6 w-[100px] text-center">
          <p className="flex gap-2 font-semibold">
            <span>O</span> <span>(YOU)</span>
          </p>
          <p className="font-bold text-3xl">14</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default BattleArea;
