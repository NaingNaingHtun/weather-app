import React from "react";
import moment from "moment";
import WeatherMap from "./WeatherMap";
export default function CurrentWeather({
  data,
  temperatureUnit,
  currentLocation,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-max p-5 text-white object-fill rounded-lg glass-effect">
        <div>
          <div>CURRENT WEATHER</div>
          <div className="text-sm font-light text-gray-300">
            {moment().format("h:mm A")}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-3">
          <img
            src={`icons/${data.weather[0].icon}.png`}
            alt="Current Weather"
            className="w-14 h-14 md:w-24 md:h-24 bg-white p-1 rounded-full"
          />
          <div className="text-3xl md:text-7xl font-bold">
            {Math.round(data.main.temp)}
            {temperatureUnit === "imperal" ? "°F" : "°C"}
          </div>
          <div>
            <p className="text-xl capitalize">{data.weather[0].description}</p>
            <p className="text-gray-300">
              Feels Like {Math.round(data.main.feels_like)}
              {temperatureUnit === "imperal" ? "°F" : "°C"}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap md:flex-nowrap gap-4">
          <div>
            <p className="text-gray-300 uppercase font-light">Wind</p>
            <p className="text-sm">{data.wind.speed} km/h</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 uppercase font-light">Humidity</p>
            <p className="text-sm">{data.main.humidity} %</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 uppercase font-light">Visibility</p>
            <p className="text-sm">{Math.round(data.visibility / 1000)} km</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 uppercase font-light">Pressure</p>
            <p className="text-sm">{data.main.pressure} mb</p>
          </div>
          <div className="text-center">
            <p className="text-gray-300 uppercase font-light">Highest</p>
            <p className="text-sm">
              {Math.round(data.main.temp_max)}
              {temperatureUnit === "imperal" ? "°F" : "°C"}
            </p>
          </div>
          <div className=" text-center">
            <p className="uppercase font-light text-gray-300">Lowest</p>
            <p className="text-sm">
              {Math.round(data.main.temp_min)}
              {temperatureUnit === "imperal" ? "°F" : "°C"}
            </p>
          </div>
        </div>
      </div>

      <WeatherMap currentLocation={currentLocation} />
    </div>
  );
}
