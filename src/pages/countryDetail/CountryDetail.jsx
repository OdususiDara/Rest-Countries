import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CountryDetail.css";
import Loading from "../../utility/Loading";

const CountryDetail = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getACountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );

        const result = await response.json();
        console.log(result[0].name.common);
        setCountry(result[0]);
      } catch (error) {
        setError("Ooops, something went wrong, please refresh.");
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      getACountry();
    }, 3000);
  }, []);

  if (isLoading) {
    return <Loading isLoading={isLoading}/>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };
  const currencies = country.currencies
    ? Object.values(country.currencies)[0].name
    : "No currency";
  const languages = Object.values(country.languages)
    .map((language) => {
      return language;
    })
    .join(", ");

  return (
    <div className="country-detail">
      <div className="countainer text-start py-5">
        <button
          onClick={handleGoBack}
          className="px-4 border-0 mb-5 rounded-2 bg-elements custom-text-white shadow-lg"
        >
          Back
        </button>
        <div className=" detail-flag d-flex flex-column gap-5 flex-md-row">
          <img src={country.flags.png} alt={country.flags.alt} />
          <div className="d-flex flex-column gap-4">
            <div className="inner-main d-md-flex align-items-center gap-5">
              <div>
                <p className="fw-bold fs-1">{country.name.common}</p>
                <p>
                  <span className="fw-semibold">Population:</span>{" "}
                  {country.population}
                </p>
                <p>
                  <span className="fw-semibold">Native name:</span>{" "}
                  {Object.values(country.name.nativeName)[0].common}
                </p>
                <p>
                  <span className="fw-semibold">Region: </span>
                  {country.region}
                </p>
                <p>
                  <span className="fw-semibold">Sub Region: </span>
                  {country.subregion}
                </p>
                <p>
                  <span className="fw-semibold">Capital:</span>{" "}
                  {country.capital ? country.capital : "No capital"}
                </p>
              </div>
            </div>
            <div className="otherSide">
              <p>
                <span className="fw-semibold">Top Level Domain: </span>
                {country.tld[0]}
              </p>
              <p>
                <span className="fw-semibold">Currencies: </span>
                {currencies}
                {/* {country.currencies ? Object.values(country.currencies)[0].name : 'No currency'} */}
              </p>
              <p>
                <span className="fw-semibold">Languages : </span>
                {languages}
                {/* {country.tld[0]} */}
              </p>
            </div>
          </div>

          <div className="border-div">
            <p>borders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
