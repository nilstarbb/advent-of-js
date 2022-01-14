const { useState, useEffect } = React;

const daysOfWeekMap = {
  0: "SUN",
  1: "MON",
  2: "TUES",
  3: "WED",
  4: "THUR",
  5: "FRI",
  6: "SAT",
};

const iconNameToSizeMap = {
  cloudy: { width: 264, height: 166 },
  sunny: { width: 208, height: 213 },
  stormy: { width: 246, height: 187 },
  snowy: { width: 230, height: 196 },
  "partly-cloudy": { width: 230, height: 209 },
  rainy: { width: 160, height: 222 },
};

const weatherMap = {
  "Light Cloud": "partly-cloudy",
  "Heavy Cloud": "cloudy",
  Snow: "snowy",
  Thunder: "stormy",
  Clear: "sunny",
  Showers: "rainy",
};

const Weather = ({ weather }) => {
  return (
    <div className="day">
      <div className="day-of-week">{daysOfWeekMap[weather.day]}</div>
      <div className="date">{weather.date}</div>

      <div className={"bar " + weather.weather}>
        <div className="weather">
          <svg
            role="img"
            width={iconNameToSizeMap[weather.weather].width}
            height={iconNameToSizeMap[weather.weather].height}
            viewBox={
              "0 0 " +
              iconNameToSizeMap[weather.weather].width +
              " " +
              iconNameToSizeMap[weather.weather].height
            }
          >
            <use xlinkHref={"#" + weather.weather}></use>
          </svg>
        </div>
        <div className="temperature">
          {weather.temperature}
          <span className="degrees">&deg;</span>
        </div>
        <div className="content">
          <div className="precipitation">
            <svg role="img" className="icon">
              <use xlinkHref="#precipitation"></use>
            </svg>
            {weather.precipitation}%
          </div>
          <div className="low">
            <svg role="img" className="icon">
              <use xlinkHref="#low"></use>
            </svg>
            {weather.low}&deg;
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then(
        (result) => {
          const res = result.consolidated_weather.map((weather) => {
            const date = new Date(weather.applicable_date);
            return {
              id: weather.id,
              date: date.getDate(),
              day: date.getDay(),
              weather: weatherMap[weather.weather_state_name],
              temperature: weather.the_temp.toFixed(0),
              low: weather.min_temp.toFixed(0),
              precipitation: weather.predictability,
            };
          });
          setWeatherData(res);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <>
      {weatherData.map((weather) => (
        <Weather key={weather.id} weather={weather} />
      ))}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
