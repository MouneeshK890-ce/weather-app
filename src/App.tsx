import "./App.css";
import { IoSearchCircle } from "react-icons/io5";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import WeatherDetails from "./Components/WeatherDetails";
import { OrbitProgress } from "react-loading-indicators";

// Images
import weather from "./assets/wea.png";
import clearIconDay from "./assets/clearIconDay.png";
import clearIconNight from "./assets/clearIconNight.png";
import brokenClouds from "./assets/cloudIcon.gif";
import cloudIconDay from "./assets/cloudyDay.gif";
import cloudIconNight from "./assets/cloudyNight.gif";
import ScatteredClouds from "./assets/scatter.png";
import showerRain from "./assets/shower.gif";
import rainDay from "./assets/rainday.gif";
import rainNight from "./assets/rainnight.gif";
import thunderStorm from "./assets/thunder.gif";
import snow from "./assets/snow.gif";
import mist from "./assets/mist.png";

import  noSignal from './assets/no-signal.png'
import cityNot from "./assets/citynotfound.png";
import Header from "./Components/Header";
import Footer from './Components/Footer'

function App() {
  let apiKey = `dd57a40f1fec450fc40c48c3dfced756`;

  const [text, setText] = useState<string>("");
  const [icon, setIcon] = useState<string>(weather);
  const [temp, setTemp] = useState<number>(0);
  const [city, setCity] = useState<string>("city");
  const [country, setCountry] = useState<string>("country");
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [humidity, sethumidity] = useState<number>(0);
  const [wind, setWind] = useState<number>(0);

  const [cityNotFound, setCityNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [weatherX, setWeatherX] = useState<string>("");

  const weatherIconMap: Record<string, string> = {
    "1dn": clearIconDay,
    "01n": clearIconNight,
    "02d": cloudIconDay,
    "02n": cloudIconNight,
    "03d": ScatteredClouds,
    "03n": ScatteredClouds,
    "04d": brokenClouds,
    "04n": brokenClouds,
    "09d": showerRain,
    "09n": showerRain,
    "10d": rainDay,
    "10n": rainNight,
    "11d": thunderStorm,
    "11n": thunderStorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist,
  };

  const search = async (): Promise<void> => {
    setLoading(true);

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      console.log(data);

      if (data.cod === "404") {
        console.error("City not Found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      sethumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setCity(data.name);
      setCountry(data.sys.country);
      setWeatherX(data.weather[0].description);

      const weatherIconCode = data.weather[0].icon;

      setIcon(weatherIconMap[weatherIconCode] || weather);
      setCityNotFound(false);
    } catch (error: unknown) {
     const message = error instanceof Error ? error.message : "An error occured while fetching data";
     setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") search();
  };

  return (

    <>
    <Header/>
    <section className="container">
      <section className="input-container">
        <input
          type="text"
          placeholder="Search City here..."
          className="cityInput"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <section className="search-icon" onClick={() => search()}>
          <IoSearchCircle size={48} />
        </section>
      </section>
      {!loading && !cityNotFound && !error && (
        <WeatherDetails
          icon={icon}
          temp={temp}
          city={city}
          country={country}
          lat={lat}
          long={long}
          humidity={humidity}
          wind={wind}
          weather={weatherX}
        />
      )}

      {loading && (
        <div className="loading-message">
          <OrbitProgress
            variant="spokes"
            color="#a5a8a5"
            size="small"
            textColor="#aeadad"
          />
        </div>
      )}
      {error && <div className="error-message">
        <img src={noSignal} alt="Network connection error" />
        <p>{error}</p>
        </div>}
      {cityNotFound && (
        <div className="city-not-found">
          <img src={cityNot} alt="city-not-found" />
          <p>City not Found</p>
        </div>
      )}
    </section>
    <Footer/>
    </>
  );
}

export default App;
