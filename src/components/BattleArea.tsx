import { useState } from "react";
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

  const handleClick = (index: number) => {
    setTurn(playerTurn(turn));
    console.log(turn);
    console.log(index);
  };

  return (
    <div className="md:w-2/3 lg:w-1/2 m-auto">
      {/* 9 squares */}
      <div className="pt-10">
        <div className="grid grid-cols-3 gap-8 place-items-center ">
          {new Array(9).fill(null).map((_, index) => {
            return (
              <div
                onClick={() => handleClick(index)}
                className=" flex items-center justify-center py-5 rounded-lg
                 bg-[#1f3540] border-[#102129] custom-shadow w-[100px]"
                key={index}
              >
                {" "}
                <img src={`${index ? iconX : iconO}`}></img>
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
