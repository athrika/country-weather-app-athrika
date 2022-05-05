import { Routes, Route, Link } from "react-router-dom";
import CountryWeather from "./pages/countryWeather";
import "./App.css";
import CountryInput from "./pages/countryInput";

function App() {
  return (
    <div>
      
      <div className='appContainer'>
        <Routes>
          <Route path="/" element={<CountryInput/>} />
          <Route path="countryWeather" element={<CountryWeather />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
