import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  long,
  humidity,
  wind,
}) => {
  return (
    <>
      <section className="image">
        <img src={icon} className="sun" alt="image" />
      </section>
      <section className="temp">{temp}°C</section>
      <section className="location">{city}</section>
      <section className="country">{country}</section>
      <section className="cord">
        <div>
          <span className="lat">Lattitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">Longitude</span>
          <span>{long}</span>
        </div>
      </section>
      <section className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidityIcon" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind-icon" className="icon" />
          <div className="data">
            <div className="wind-percentage">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherDetails;
