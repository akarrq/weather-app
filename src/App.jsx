import React from "react";
import { createApi } from "unsplash-js";

import "./App.scss";
import Clock from "./Clock";
import Weather from "./Weather";
import Forecast from "./Forecast";
import Picture from "./Picture";

class App extends React.Component {
  state = {
    inputValue: "Gdansk",
    cityName: "",
    countryName: "",
    temp_c: "",
    conditionTxt: "Sunny",
    conditionIcon: "",
    photo: { photoUrl: "" },
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
    const unsplash = createApi({
      accessKey: "mrc8ss66kbLPrLLKjLlB09tY32LiOMBFMqZlaJE05Vs",
    });

    unsplash.search
      .getPhotos({
        query: "Bezchmurnie",
        lang: "pl",
        perPage: 1,
        orientation: "landscape",
      })
      .then((result) => {
        if (result.errors) {
          console.log("error occurred: ", result.errors[0]);
        } else {
          const photo = result.response;
          console.log(photo);
          this.setState(() => ({
            photo: {
              photoUrl: photo.results[0].urls.regular,
              photoAlt: photo.results[0].alt_description,
              author: photo.results[0].user.name,
              photoLink: photo.results[0].links.html,
            },
          }));
        }
      });
  };

  getWeatherData = () => {
    const URL = `https://api.weatherapi.com/v1/forecast.json?key=bcecae4f3c1e4448b52134701232303&q=${this.state.inputValue}&days=4&aqi=no&alerts=no&lang=pl`;
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
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
      cityName,
      countryName,
      temp_c,
      conditionIcon,
      conditionTxt,
      forecastDay,
      inputValue,
      isInputVisible,
    } = this.state;
    const { photoAlt, photoUrl, photoLink, author } = this.state.photo;
    const { hour, minutes, day, month, dayDate } = this.state.date;

    return (
      <>
        <Picture
          photoAlt={photoAlt}
          photoUrl={photoUrl}
          photoLink={photoLink}
          author={author}
        />
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
