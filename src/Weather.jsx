import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Weather = (props) => {
  return (
    <div className="board">
      <p className="board__location">
        {props.cityName}, {props.countryName}
      </p>
      <button className="board__moreBtn">
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
      <div className="txt">
        <h1 className="board__temp">{props.temp}&#8451;</h1>
        <h2 className="board__condition">{props.conditionTxt}</h2>
      </div>
      <img src={props.conditionIcon} className="board__img" />
    </div>
  );
};

export default Weather;
