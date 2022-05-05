import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import  "./countryWeather.css";


const CountryWeather = () => {
  const localState:any = useLocation().state;
  const [locationData, setLocationData] = useState<any>({
    location: { name: "", country: ""},
    current: { temperature: "", weather_icons: [], weather_descriptions: [], wind_speed:"", timezone_id:"" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localState.data) {
      navigate("/");
    } else {
      const { location, current } = localState.data;
      setLocationData({ location, current });
    }
  }, []);

  return (
    <div className='container'>
      <div className='content'>
        <div className='weatherData'>

          <span>
            Temperature: {locationData.current.temperature}
            <sup>°C</sup>
          </span>
          <br></br>
          <img
            className='weatherIcon'
            alt="Image icon"
            width='120px'
            src={locationData.current.weather_icons[0]}
          />
          
        </div>
        <p>Wind speed: {locationData.current.wind_speed} kmph</p>
        <p>
          Capital: {locationData.location.name}
        </p>
        <p>
          Country: {locationData.location.country}
        </p>
        <p>
          Time Zone ID: {locationData.location.timezone_id}
        </p>
        <button className="backbutton" onClick={() => navigate("/")}> ← </button>
      </div>
    </div>
  );
};

export default CountryWeather;
