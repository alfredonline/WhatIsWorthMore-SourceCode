import React from "react";

function GameOverScreen(props) {
  const loserImg =
    "https://media3.giphy.com/media/pMIAVROc0et68/giphy.gif?cid=ecf05e47pnic8x8tek5s91x6rxhwnzk4avkxdl4a4r4r6k3m&rid=giphy.gif&ct=g";

  return (
    <div
      className="GameOverScreen"
      style={{
        backgroundImage: "url(" + `${loserImg}` + ")",
      }}
    >
      <div className="filter"></div>

      <div className="loserScreenModal">
        <div>You scored</div>
        <div>{props.score}</div>
        <div>{props.score === 1 ? "Point" : "Points"}</div>
        <div
          className="btnMain"
          onClick={() => {
            props.resetGameFunc();
          }}
        >
          Play again
        </div>
      </div>
    </div>
  );
}

export default GameOverScreen;
