import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import api from "../api";
export default function Search({ handleSearchChange }) {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    handleSearchChange(searchData);
  };
  const loadOptions = (inputValue) => {
    const results = api
      .get(`/cities/?minPopulation=10000&namePrefix=${inputValue}`)
      .then((response) => {
        return {
          options: response.data.data.map((city) => {
            return {
              value: { lat: city.latitude, lon: city.longitude },
              label: `${city.city}, ${city.countryCode}, ${city.country}`,
            };
          }),
        };
      })
      .catch(() => ({ options: [] }));
    return results;
  };
  return (
    <AsyncPaginate
      placeholder="Search a location"
      value={search}
      onChange={handleOnChange}
      debounceTimeout={600}
      loadOptions={loadOptions}
      className="grow"
    />
  );
}
