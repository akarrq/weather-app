import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

import Form from "./Form";

const Weather = (props) => {
  return (
    <div className="board">
      <p className="board__location">
        {props.isInputVisible
          ? null
          : `${props.cityName}, ${props.countryName}`}
      </p>
      <Form
        value={props.value}
        onChange={props.onChange}
        isInputVisible={props.isInputVisible}
      />
      <button className="board__moreBtn" onClick={props.onClick}>
        <FontAwesomeIcon
          icon={props.isInputVisible ? faCircleXmark : faPenToSquare}
        />
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
