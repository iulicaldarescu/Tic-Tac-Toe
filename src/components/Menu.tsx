import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import styles from "../styles/Menu.module.css";
import { Link, useNavigate } from "react-router-dom";

function Menu() {
  const [playerChoice, setPlayerChoice] = useState<string>("X");

  const [gameMode, setGameMode] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${gameMode}`);
  }, [gameMode]);

  return (
    <div>
      <div className="flex justify-center mt-24">
        <img src={logo}></img>
      </div>

      <div
        className={`bg-[#1e3640] rounded-lg text-center my-10 ${styles["custom-shadow-black"]}`}
      >
        <p className="py-5 text-[#a9bec9] font-semibold">
          PICK PLAYER 1'S MARK
        </p>

        <div className="flex bg-[#192a32] mx-4 py-4 justify-center px-4 rounded-lg">
          <div
            onClick={() => {
              setPlayerChoice("X");
            }}
            className={`${
              playerChoice === "X" ? "bg-[#a9bec9]" : ""
            }    w-full flex justify-center rounded-lg py-2`}
          >
            <svg
              width="54"
              height="54"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path
                d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
                stroke="#a9bec9"
                stroke-width="2"
                fill={`${playerChoice === "O" ? "#a9bec9" : "#192a32"} `}
              />
            </svg>
          </div>

          <div
            className={`${
              playerChoice === "O" ? "bg-[#a9bec9]" : ""
            }    w-full flex justify-center rounded-lg py-2`}
            onClick={() => {
              setPlayerChoice("O");
            }}
          >
            <svg
              width="56"
              height="56"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 66 66"
            >
              <path
                d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                stroke="#a9bec9"
                stroke-width="2"
                fill={`${playerChoice === "X" ? "#a9bec9" : "#192a32"} `}
              />
            </svg>
          </div>
        </div>

        <p className="py-5 text-[#536a74]">REMEMBER : X GOES FIRST</p>
      </div>

      {/* New game modes */}

      <div className="flex flex-col gap-5 text-center">
        <Link to={`/${gameMode}`}>
          <div
            onClick={() => setGameMode("cpu")}
            className={`bg-[#f2b236] font-bold rounded-lg py-2 ${styles["custom-shadow-yellow"]}`}
          >
            NEW GAME (VS CPU)
          </div>
        </Link>
        <div
          onClick={() => setGameMode("player")}
          className={`bg-[#31c4be] font-bold rounded-lg py-2 ${styles["custom-shadow-blue"]}`}
        >
          NEW GAME (VS PLAYER)
        </div>
      </div>
    </div>
  );
}

export default Menu;
