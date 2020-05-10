import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetail from "./CountryDetails";
function Search() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setSpecies] = useState("");
  const [one, setDateOne] = useState("");
  const [two, setDateTwo] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  var [page, setPage] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(one, two);
    var result = countries.filter(function (obj) {
      return obj.created >= one && obj.created <= two;
    });
    console.log(result);
    setCountries(result);
  };

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
          country.name.toLowerCase().includes(search.toLowerCase()) &&
          country.status.toLowerCase().includes(status.toLowerCase())
      )
    );
  }, [search, status, countries]);

  // useEffect(() => {
  //   setFilteredCountries(
  //     countries.filter((country) =>
  //       country.status.toLowerCase().includes(status.toLowerCase())
  //     )
  //   );
  // }, [status, countries]);

  const fetchItems = (page) => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => {
        setCountries(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const previousPage = () => {
    if (page >= 2) {
      setPage((page = page - 1));
      fetchItems(page);
    }
  };

  const nextPage = (e) => {
    if (page >= 0) {
      setPage((page = page + 1));
      fetchItems(page);
    }
  };

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
      <input
        type="text"
        placeholder="Search Species"
        onChange={(e) => setSpecies(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="2017-11-04"
          onChange={(e) => setDateOne(e.target.value)}
        />
        <input
          type="text"
          placeholder="2017-11-05"
          onChange={(e) => setDateTwo(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {filteredCountries.slice(0, 20).map((country, idx) => (
        <CountryDetail key={idx} {...country} />
      ))}
      <b>page: {page >= 1 ? page : "0"}</b>
      <div className="pageNavigation">
        <button onClick={previousPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
}

export default Search;
