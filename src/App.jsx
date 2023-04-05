import React from "react";
import { createClient } from "pexels";

import "./App.scss";
import Clock from "./Clock";
import Weather from "./Weather";
import Forecast from "./Forecast";

class App extends React.Component {
  state = {
    inputValue: "Gdansk",
    cityName: "",
    countryName: "",
    temp_c: "",
    conditionTxt: "Sunny",
    conditionIcon: "",
    photoOriginal: "",
    photoMedium: "",
    date: {
      hour: null,
      minutes: null,
      day: null,
      month: null,
      dayDate: null,
    },
    forecastDay: [],
    isInputVisible: false,
  };

  componentDidMount() {
    this.getWeatherData();
    this.weatherIntervalId = setInterval(
      () => this.getWeatherData(),
      60 * 15 * 1000
    );
    this.getPicture();
    this.getDate();
    this.intervalId = setInterval(() => this.getDate(), 60 * 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue !== this.state.inputValue) this.getWeatherData();
  }

  componentWillUnmount() {
    clearInterval(this.weatherIntervalId);
    clearInterval(this.intervalId);
  }

  getPicture = () => {
    const client = createClient(
      "jzLNCVvA6m2FFDkN4YD3elUiv7eE7ztvm6WJbJ2wFVKLujNnLVRuZG1V"
    );
    const query = this.state.conditionTxt;

    client.photos
      .search({ query, per_page: 1, orientation: "portrait" })
      .then((photos) =>
        this.setState({
          photoOriginal: photos.photos[0].src.original,
          photoMedium: photos.photos[0].src.medium,
        })
      )
      .catch((err) => console.log(err));
  };

  getWeatherData = () => {
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=bcecae4f3c1e4448b52134701232303&q=${this.state.inputValue}&days=4&aqi=no&alerts=no&lang=pl`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          temp_c: data.current.temp_c,
          conditionTxt: data.current.condition.text,
          conditionIcon: data.current.condition.icon,
          cityName: data.location.name,
          countryName: data.location.country,
          forecastDay: data.forecast.forecastday,
        });
      })
      .catch((err) => console.log(err));
  };

  getDate() {
    const date = new Date();
    this.setState(() => ({
      date: {
        hour: date.getHours(),
        minutes: date.getMinutes(),
        day: date.getDay(),
        month: date.getMonth(),
        dayDate: date.getDate(),
      },
    }));
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isInputVisible: !prevState.isInputVisible,
    }));
  };

  handleInputChange = (e) => {
    this.setState(() => ({
      inputValue: e.target.value,
    }));
  };

  render() {
    const {
      photoMedium,
      photoOriginal,
      cityName,
      countryName,
      temp_c,
      conditionIcon,
      conditionTxt,
      forecastDay,
      inputValue,
      isInputVisible,
    } = this.state;
    const { hour, minutes, day, month, dayDate } = this.state.date;

    return (
      <>
        {photoOriginal.length > 0 ? (
          <picture>
            <source src={photoMedium} media="(min-width: 600px)" />
            <img className="background" src={photoOriginal} />
          </picture>
        ) : null}
        <main>
          <Clock
            hour={hour}
            minutes={minutes}
            day={day}
            month={month}
            dayDate={dayDate}
          />
          <Weather
            cityName={cityName}
            countryName={countryName}
            temp={temp_c}
            conditionTxt={conditionTxt}
            conditionIcon={conditionIcon}
            onClick={this.handleClick}
            onChange={this.handleInputChange}
            value={inputValue}
            isInputVisible={isInputVisible}
          />
        </main>
        <aside>
          {forecastDay.length > 0 ? <Forecast forecast={forecastDay} /> : null}
        </aside>
      </>
    );
  }
}
export default App;
