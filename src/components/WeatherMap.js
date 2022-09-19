import React from "react";
import { WEATHER_API_KEY } from "../api";
import {
  MapContainer,
  useMapEvents,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
function MapEvents({ latLng }) {
  const map = useMapEvents({});
  map.setView(latLng);
  return null;
}
export default function WeatherMap({ currentLocation }) {
  const { lat, lon } = currentLocation.value;
  return (
    <div>
      <MapContainer
        center={[lat, lon]}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full md:w-[400px] h-[250px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openweathermap.org/copyright">OpenWeatherMap</a> contributors'
          url={`https://tile.openweathermap.org/map/temp/{z}/{x}/{y}.png?appid=${WEATHER_API_KEY}`}
        />

        <Marker position={[lat, lon]}>
          <Popup>{currentLocation.label}</Popup>
        </Marker>
        <MapEvents latLng={[lat, lon]} />
      </MapContainer>
    </div>
  );
}
