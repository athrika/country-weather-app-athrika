import { ChangeEventHandler, useEffect, useState } from "react";
import Input_Label from "../components/Input_Label/inputLabel";
import "./countryInput.css";
import useWeatherApi from "../hooks/Api";
import usePrevious from "../hooks/Previous";
import { useNavigate } from "react-router-dom";

const CountryInput = () => {
  const [countryName, setCountryName] = useState("");
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const previousCountry = usePrevious(countryName);
  const navigate = useNavigate();
  const { data, error, isLoading } = useWeatherApi(countryName, triggerFetch);

  const regex = /^[a-zA-Z]+$/;
  

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCountryName(e.target.value);
  };
  const handleOnSumbit = (e: any) => {
    e.preventDefault();
    if (countryName !== previousCountry) setTriggerFetch((prev) => !prev);
  };

  useEffect(() => {
    if (data) navigate("/countryWeather", { state: { data } });
  }, [data]);

  useEffect(() => {
    if (countryName === "") {
      setSubmitDisabled(true);
    } 
    else if(!regex.test(countryName)){
      setSubmitDisabled(true);
    }
    else if (countryName){
      setSubmitDisabled(false);
    }
    else setSubmitDisabled(true);
  },[countryName]);

  if (error.type !== 0) {
    return (
      <div>
        {error.type === 400 ? (
          <div>
            <h1>Bad Request</h1>
            <a
              className='tryAgain'
              onClick={() => window.location.reload()}
            >
              Try again
            </a>
          </div>
        ) : (
          <h1>Uh ho! Something went wrong!</h1>
        )}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleOnSumbit}>
        <Input_Label
          id="countryInput"
          onChange={handleInputChange}
          value={countryName}
          placeholder="Country Name"
        />
        <button
          disabled={isSubmitDisabled}
          id='submitButton'
          className={`$'submitButton' ${
            isSubmitDisabled ? 'disabled' : ""
          }`}
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CountryInput;
