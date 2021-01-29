import React, { useState } from "react";
import { render } from "react-dom";
import { Link, Router } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";
import Hooks from "./hooksInDepth/hooksInDepth";

const App = () => {
  const themeHook = useState("peru");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt me!</Link>
          </header>
          <Router>
            {/* Reach router has a scoring algorithm so it does not matter in which order you place your components */}
            {/* React router uses a Switch component and will render the first match so the order in React router IS important */}
            <SearchParams path="/" />
            <Details path="/details/:id" />
            <Hooks path="/hooks" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
