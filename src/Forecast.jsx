const Forecast = (props) => {
  return (
    <>
      <div className="board board--forecast">
        <div>
          <p className="board__day board__dayDate">{props.forecast[0].date}</p>
          <img
            className="board__dayImg"
            src={props.forecast[0].day.condition.icon}
          />
          <p className="board__day board__dayTemp">
            {props.forecast[0].day.mintemp_c}&#176;/{" "}
            {props.forecast[0].day.maxtemp_c}&#176;
          </p>
          <p className="board__day board__dayRain">
            {props.forecast[0].day.daily_chance_of_rain}% Deszcz
          </p>
        </div>
      </div>
    </>
  );
};

export default Forecast;
