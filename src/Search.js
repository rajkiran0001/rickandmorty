import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "@reach/router";

function Search() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then((res) => {
        setCountries(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        (country) =>
          country.name.toLowerCase().includes(search.toLowerCase()) ||
          country.species.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }
  console.log(countries);

  return (
    <div className="Search">
      <h1>Countries Lists</h1>
      <input
        type="text"
        placeholder="Search Countries"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredCountries.map((country, idx) => (
        <CountryDetail key={idx} {...country} />
      ))}
    </div>
  );
}

const CountryDetail = (props) => {
  const { name, image, species, status, id } = props;
  return (
    <>
      <Link to={`/details/${id}`}>
        <p>
          <img
            src={image}
            alt={name}
            style={{ width: "20px", height: "20px" }}
          />
        </p>
        <p>name: {name}</p>
        <p>species: {species}</p>
        <p>status: {status}</p>
      </Link>
    </>
  );
};

export default Search;
