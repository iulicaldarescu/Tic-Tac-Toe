import logo from "../assets/logo.svg";
import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";
import restart from "../assets/icon-restart.svg";

function Header({ turn }: { turn: string }) {
  return (
    <header className="flex justify-between items-center">
      {/* LEFT SIDE HEADER */}
      <div>
        <img src={logo} alt="logo"></img>
      </div>
      {/* MIDDLE SIDE HEADER */}
      <div
        className="flex bg-[#1f3540] font-bold text-[#a1b7c2] items-center gap-4 px-4 py-2
       rounded-lg border-b-[6px] border-[#102129]"
      >
        {" "}
        <img
          src={`${turn === "X" ? iconX : iconO}`}
          className="h-7 "
          alt="player turn"
        />
        <p>TURN</p>
      </div>

      {/* RIGHT SIDE HEADER */}
      <div className="bg-[#a1b7c2] py-[9px] border-b-[6px] border-[#6c8997] rounded-lg px-[10px]">
        <img src={restart} alt="restart"></img>
      </div>
    </header>
  );
}

export default Header;
