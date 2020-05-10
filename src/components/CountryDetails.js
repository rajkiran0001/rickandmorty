import React from "react";
import { Link } from "@reach/router";

const CountryDetail = (props) => {
  const { name, image, species, status, id, created } = props;
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
        <p>created: {created}</p>
      </Link>
    </>
  );
};

export default CountryDetail;
