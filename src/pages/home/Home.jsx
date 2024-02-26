import React, { useEffect, useState } from "react";
import Countries from "../../components/countries/Countries";
import SearchSection from "../../components/searchSection/SearchSection";

const Home = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const countries = await res.json();
      // console.log(countries);
      setIsLoading(false);
      setData(countries);
    };

    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);
  const handleSearch = (userInput) => {
    const searchData = data.filter((country) =>
      country.name.common
        .toLowerCase()
        .startsWith(userInput.toLowerCase().trim())
    );
    console.log(searchData);
    setFilteredCountries(searchData);
  };

  const handleRegion = (choosenRegion) => {
    const searchedRegion = data.filter(
      (country) => country.region === choosenRegion
    );
    setFilteredCountries(searchedRegion);
  };
  return (
    <div>
      <SearchSection
        handleSearch={handleSearch}
        isLoading={isLoading}
        handleRegion={handleRegion}
      />
      <Countries
        countries={filteredCountries.length > 0 ? filteredCountries : data}
        isLoading={isLoading}
      />
      {/* {data ? <Countries countries={data} /> : null}
      {isloading ? <p>Loading...</p> : null} */}
    </div>
  );
};

export default Home;
