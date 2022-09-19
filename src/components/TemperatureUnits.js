import React, { useState } from "react";
import { MdClose } from "react-icons/md";
export default function TemperatureUnits({
  temperatureUnit,
  setTemperatureUnit,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative py-1 px-2 glass-effect rounded-md z-[999]">
      <div
        onClick={() => setOpen(true)}
        className="grid place-content-center w-5 h-5s cursor-pointer text-white text-xl"
      >
        {temperatureUnit === "imperal" ? "°F" : "°C"}
      </div>
      <div
        className="absolute right-0 top-[100%] rounded-lg bg-white w-max p-3"
        style={{ display: open ? "block" : "none" }}
      >
        <div className="flex justify-between items-center ">
          <span className="font-bold text-lg">Temperature Settings</span>
          <MdClose
            onClick={() => setOpen(false)}
            className="font-light cursor-pointer text-xl"
          />
        </div>
        <div className="font-light text-sm mt-5">Temperature</div>
        <div className="flex gap-2 mt-2">
          <div
            className="p-2 border-[0.5px] cursor-pointer rounded-lg"
            onClick={() => {
              setOpen(false);
              setTemperatureUnit("imperal");
            }}
            style={{
              border:
                temperatureUnit === "imperal" ? "0.5px solid blue" : "none",
            }}
          >
            Fahrenheit (°F)
          </div>
          <div
            className="p-2 border-[0.5px] cursor-pointer rounded-lg"
            onClick={() => {
              setTemperatureUnit("metric");
              setOpen(false);
            }}
            style={{
              border:
                temperatureUnit === "metric" ? "0.5px solid blue" : "none",
            }}
          >
            Celsius (°C)
          </div>
        </div>
      </div>
    </div>
  );
}
