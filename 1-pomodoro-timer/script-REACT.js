const { useState, useEffect } = React;

const App = () => {
  const [minute, setMinute] = useState("1");
  const [second, setSecond] = useState("00");
  const inputSecond = parseInt(minute) * 60 + parseInt(second);
  const maxSecond = 99 * 60 + 59;

  const [totalSecond, setTotalSecond] = useState(
    inputSecond > maxSecond ? maxSecond : inputSecond
  );
  const [targetSecond, setTargetSecond] = useState(0);

  const [isClicking, setIsClicking] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (isClicking) {
      const interval = setInterval(() => {
        if (totalSecond === 0) {
          clearInterval(interval);
          alert("Ding!");
          setIsClicking((isClicking) => false);
        } else {
          setTotalSecond((totalSecond) => totalSecond - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }

    if (totalSecond === 0) {
      setIsClicking((isClicking) => false);
      setTargetSecond(0);
    }
  }, [totalSecond, isClicking]);

  useEffect(() => {
    setMinute(
      Math.floor(totalSecond / 60)
        .toString()
        .padStart(2, "0")
    );
    setSecond((totalSecond % 60).toString().padStart(2, "0"));
  }, [totalSecond]);

  const clickButton = () => {
    if (isSetting) {
      setTotalSecond(inputSecond > maxSecond ? maxSecond : inputSecond);
      setTargetSecond(inputSecond > maxSecond ? maxSecond : inputSecond);
    }

    if (totalSecond > 0) {
      setIsClicking((isClicking) => !isClicking);
      setTargetSecond((targetSecond) =>
        targetSecond > 0
          ? targetSecond
          : inputSecond > maxSecond
          ? maxSecond
          : inputSecond
      );
      setIsSetting((isSetting) => false);
    }
  };

  const clickSetting = () => {
    if (!isClicking) {
      setIsSetting((isSetting) => true);
    }
  };

  const changeMinute = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMinute(value.length > 0 ? value : 0);
  };

  const changeSecond = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setSecond(value.length > 0 ? value : 0);
  };

  return (
    <>
      <div className={isClicking ? "ring" : "ring ending"}>
        <svg width="518" height="518" viewBox="0 0 518 518">
          <circle
            strokeWidth="9px"
            x="0"
            y="y"
            cx="259"
            cy="259"
            r="254"
            strokeDasharray="1595.12 1595.12"
            style={{
              strokeDashoffset:
                totalSecond == 0 || targetSecond == 0
                  ? 0
                  : 1595.12 * (1 - totalSecond / targetSecond),
            }}
          />
        </svg>
      </div>
      <div className="timer">
        <div className="time">
          <div className="minutes">
            <input
              type="text"
              value={minute}
              onChange={changeMinute}
              disabled={!isSetting}
              maxLength="2"
            />
          </div>
          <div className="colon">:</div>
          <div className="seconds">
            <input
              type="text"
              value={second}
              onChange={changeSecond}
              disabled={!isSetting}
              maxLength="2"
            />
          </div>
        </div>
        <button className="start" onClick={clickButton}>
          {isClicking ? "stop" : "start"}
        </button>
        <button className="settings" onClick={clickSetting}>
          <img src="images/gear.svg" alt="Settings" />
        </button>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
