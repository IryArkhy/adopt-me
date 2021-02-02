import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
/*
....
any other browser-only things
....
*/

// hydrate is a render-like function: it expects the markup to be already in this place, just take over what's there, do not re-render
hydrate(<App />, document.getElementById("root"));

//!!! you have to make sure that tere is no reference to Browser API (lice document) inside your files (Not inside components: inside components is fine). In our case we had one reference inside the Modal.js when we used Portals. We moved it inside the useEffect

// we also need to install: npm install babel-cli express, npm install  @babel/node

// configure 2 command in package.json

// create server/ dir and index.js in it

// inside index.html inside the script tag put ClientApp.js instead of App.js
// <script src="ClientApp.js"></script>

// npm run start
//localhost:3000
