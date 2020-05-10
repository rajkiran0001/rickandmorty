import React from "react";
import { Router, Link } from "@reach/router";
import Search from "./components/Search";
import Details from "./components/Details";
import "./App.css";
import "./fonts.css";

function App() {
  return (
    <div className="app">
      <header>
        <Link to="/">
          <h1>RickFinder</h1>
        </Link>
      </header>
      <Router>
        <Search path="/" />
        <Details path="/details/:id" />
        <Search path="/charecter/page/:id" />
      </Router>
    </div>
  );
}

export default App;
