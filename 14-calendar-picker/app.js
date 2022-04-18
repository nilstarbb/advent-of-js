const { useState, useEffect } = React;

const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const App = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const firstDayOfMonth = new Date(today.getFullYear(), currentMonth, 1);
  const lastDayOfMonth = new Date(today.getFullYear(), currentMonth + 1, 0);

  const handleChangeMonth = (i) =>
    setCurrentMonth(
      currentMonth + i >= 0 && currentMonth + i <= 11
        ? currentMonth + i
        : currentMonth
    );

  return (
    <>
      <div className="previous">
        <img
          src="images/previous.svg"
          alt="Previous"
          onClick={() => handleChangeMonth(-1)}
        />
      </div>

      <div className="month">{months[currentMonth]}</div>

      <div className="next">
        <img
          src="images/next.svg"
          alt="Next"
          onClick={() => handleChangeMonth(1)}
        />
      </div>

      <div className="day-of-week">S</div>
      <div className="day-of-week">M</div>
      <div className="day-of-week">T</div>
      <div className="day-of-week">W</div>
      <div className="day-of-week">T</div>
      <div className="day-of-week">F</div>
      <div className="day-of-week">S</div>

      {[...Array(firstDayOfMonth.getDay())].map((a, i) => (
        <div key={i}></div>
      ))}
      {[...Array(lastDayOfMonth.getDate())].map((a, i) => (
        <div
          key={i}
          className={
            currentMonth == today.getMonth() && i + 1 == today.getDate()
              ? "today"
              : ""
          }
        >
          {i + 1}
        </div>
      ))}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
