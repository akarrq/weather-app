const Forecast = (props) => {
  const days = ["Ndz", "Po", "Wt", "Śr", "Cz", "Pt", "So"];

  const forecasts = props.forecast.map((forecast) => {
    let foreDate = new Date(forecast.date_epoch * 1000);
    let date = foreDate.getDate();
    let dateDay = foreDate.getDay();

    return (
      <div key={forecast.date}>
        <p className="board__day board__dayDate">
          {days[dateDay]} {date}
        </p>
        <img className="board__dayImg" src={forecast.day.condition.icon} />
        <p className="board__day board__dayTemp">
          {forecast.day.mintemp_c}&#176;/ {forecast.day.maxtemp_c}&#176;
        </p>
        <p className="board__day board__dayRain">
          {forecast.day.daily_chance_of_rain}% Opady
        </p>
      </div>
    );
  });

  return <div className="board board--forecast">{forecasts}</div>;
};

export default Forecast;
