import { WEATHER_API_KEY } from "./api";
import { useEffect, useState } from "react";
import TemperatureUnits from "./components/TemperatureUnits";
import CurrentWeather from "./components/CurrentWeather";
import Slider from "react-slick";
import Search from "./components/Search";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { BsWind } from "react-icons/bs";
const WEATHER_URI = `https://api.openweathermap.org/data/2.5`;
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastsDays, setForecastsDays] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [chosenForecastWeather, setChosenForecastWeather] = useState(0);
  const [currentLocation, setCurrentLocation] = useState({
    label: "New York, NY, USA",
    value: { lat: 40.7127837, lon: -74.0059413 },
  });
  const [temperatureUnit, setTemperatureUnit] = useState("imperal");
  //Fetch Weather Data
  const fetchWeatherData = (lat, lon) => {
    fetch(
      `${WEATHER_URI}/weather?lat=${lat}&lon=${lon}&appId=${WEATHER_API_KEY}&units=${temperatureUnit}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setCurrentWeather(data);
      });
  };
  //fetchForecastWeatherData
  const fetchForecastData = (lat, lon) => {
    fetch(
      `${WEATHER_URI}/forecast?lat=${lat}&lon=${lon}&appId=${WEATHER_API_KEY}&units=${temperatureUnit}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const firstDay = moment.unix(data.list[0].dt).format("ddd");
        const secondDay = moment.unix(data.list[8].dt).format("ddd");
        const thridDay = moment.unix(data.list[16].dt).format("ddd");
        const fourthDay = moment.unix(data.list[24].dt).format("ddd");
        const fifthDay = moment.unix(data.list[32].dt).format("ddd");
        // console.log(firstDay, secondDay, thridDay, fourthDay, fifthDay);
        setForecastsDays([firstDay, secondDay, thridDay, fourthDay, fifthDay]);
        setForecasts(data.list);
      });
  };
  //handleOnSearchChange
  const handleOnSearchChange = (city) => {
    setCurrentLocation(city);
    fetchWeatherData(city.value.lat, city.value.lon);
    fetchForecastData(city.value.lat, city.value.lon);
  };
  //fetching New York weather as the default weather data
  useEffect(() => {
    fetchWeatherData(currentLocation.value.lat, currentLocation.value.lon);
    fetchForecastData(currentLocation.value.lat, currentLocation.value.lon);
  }, []);
  //fetching weather again when the temperatureUnit changes
  useEffect(() => {
    fetchWeatherData(currentLocation.value.lat, currentLocation.value.lon);
    fetchForecastData(currentLocation.value.lat, currentLocation.value.lon);
  }, [temperatureUnit]);
  return (
    <div
      className="p-5"
      style={{
        backgroundImage: "linear-gradient(135deg, #599bc1 0%, #6165b7 100%)",
      }}
    >
      <div className="max-w-[1080px] mx-auto my-[20px] p-4 z-[999]">
        <div className="flex gap-4 ">
          <Search handleSearchChange={handleOnSearchChange} />
          <TemperatureUnits
            temperatureUnit={temperatureUnit}
            setTemperatureUnit={setTemperatureUnit}
          />
        </div>
      </div>
      <div className="mx-auto my-[20px] max-w-[1080px]">
        <div className="text-lg">{currentLocation.label}</div>
        {currentWeather && (
          <CurrentWeather
            data={currentWeather}
            temperatureUnit={temperatureUnit}
            currentLocation={currentLocation}
          />
        )}
        <div className="mt-3">
          <p className="uppercase text-white">5 days forecasts/every 3 hours</p>
        </div>
      </div>
      <div className="mx-auto my-[20px] max-w-[1080px]">
        <Tabs
          selectedIndex={chosenForecastWeather}
          onSelect={(index) => setChosenForecastWeather(index)}
        >
          <TabList className="flex my-2 border-b-[0.5px]">
            {forecastsDays.map((forecast, index) => (
              <Tab
                key={index}
                className="text-white grow border-none outline-none text-center rounded-none cursor-pointer py-1"
              >
                {forecast}
              </Tab>
            ))}
          </TabList>
          {forecastsDays.map((forecast, index) => {
            const start = 8 * chosenForecastWeather;
            const end = (chosenForecastWeather + 1) * 8;
            return (
              <TabPanel key={index}>
                <Slider
                  dots={true}
                  slidesToShow={7}
                  slidesToScroll={1}
                  initialSlide={0}
                  infinite={false}
                  key={index}
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 7,
                        slidesToScroll: 1,
                        initialSlide: 0,
                      },
                    },
                    {
                      breakpoint: 800,
                      settings: {
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        initialSlide: 0,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        initialSlide: 0,
                      },
                    },
                    {
                      breakpoint: 400,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        initialSlide: 0,
                      },
                    },
                  ]}
                >
                  {forecasts.slice(start, end).map((forecast, index) => (
                    <div key={index} className="min-h-[200px]">
                      <div className="py-5 rounded-t-lg text-white">
                        <img
                          src={`icons/${forecast.weather[0].icon}.png`}
                          alt="forecast"
                          className="w-10 h-10 mx-auto bg-gray-200 p-1 rounded-full"
                        />
                        <div className="text-center mt-2 text-2xl md:text-3xl">
                          {Math.round(forecast.main.temp)}
                          {temperatureUnit === "imperal" ? "°F" : "°C"}
                        </div>
                        <div className="text-center mt-2 capitalize">
                          {forecast.weather[0].description}
                        </div>
                        <div className="flex justify-center items-center gap-1 mt-2 text-sm">
                          <BsWind className="font-light text-gray-300" />
                          <span className="text-gray-300">
                            {forecast.wind.speed} km/h
                          </span>
                        </div>
                      </div>
                      <div className="text-center p-1 border-t-[0.5px] text-white">
                        {moment.unix(forecast.dt).format("h:mm: A")}
                      </div>
                    </div>
                  ))}
                </Slider>
              </TabPanel>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}

export default App;
