const { useState, useEffect } = React;

const picks = ["rock", "paper", "scissors"];

const pickWins = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

const Winner = ({ result, handlePlayAgain }) => {
  useEffect(() => {
    switch (result.result) {
      case "computer-wins":
        document.body.classList.add("winner", "computer-wins");
        document.body.classList.remove("you-win", "tie");
        break;
      case "you-win":
        document.body.classList.add("winner", "you-win");
        document.body.classList.remove("computer-wins", "tie");
        break;
      case "tie":
        document.body.classList.add("winner", "tie");
        document.body.classList.remove("computer-wins", "you-win");
      default:
        break;
    }
  }, []);

  return (
    <>
      <div className="your-pick">
        <h1 className="you-win">you win</h1>
        <h1 className="tie">tie</h1>
        <img
          src={"./images/" + result.userPick + ".png"}
          alt={result.userPick}
        />
      </div>
      <div className="computer-pick">
        <h1 className="computer-wins">computer wins</h1>
        <img
          src={"./images/" + result.computerPick + ".png"}
          alt={result.computerPick}
        />
      </div>
      <button className="play-again" onClick={() => handlePlayAgain()}>
        play again?
      </button>
    </>
  );
};

const PickOption = ({ option, handleClick }) => {
  return (
    <li className="pick-one">
      <button onClick={() => handleClick(option)}>
        <img src={"./images/" + option + ".png"} alt={option} />
        {option}
      </button>
    </li>
  );
};

const Pick = ({ handleClick }) => {
  useEffect(
    () => document.body.classList.remove("winner", "you-win", "computer-wins"),
    []
  );

  return (
    <>
      <h1>pick one</h1>
      <ul>
        {picks.map((pick) => (
          <PickOption key={pick} option={pick} handleClick={handleClick} />
        ))}
      </ul>
    </>
  );
};

const App = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playResult, setPlayResult] = useState(null);

  useEffect(() => {
    if (playResult) {
      setIsPlaying(false);
    }
  }, [playResult]);

  const handlePick = (userPick) => {
    const computerPick = picks[Math.floor(Math.random() * picks.length)];
    const result = {
      userPick: userPick,
      computerPick: computerPick,
      result:
        userPick == computerPick
          ? "tie"
          : pickWins[userPick] == computerPick
          ? "you-win"
          : "computer-wins",
    };
    setPlayResult(result);
  };

  const handlePlayAgain = () => {
    setIsPlaying(true);
    setPlayResult(null);
  };

  return (
    <>
      {isPlaying ? (
        <Pick handleClick={handlePick} />
      ) : (
        <Winner result={playResult} handlePlayAgain={handlePlayAgain} />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
