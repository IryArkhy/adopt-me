import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

// this is going to read from the output HTML so that we could use that in our server side rendering
const html = fs.readFileSync("dist/index.html").toString();

// we are going to split HTML into 2 parts. The first part - everything before the string "node rendered" that we have put insde div#root. The second - after these words. Between these parts we will put our markup.
// You can do this with EJS or handlebars, but we do this, this way
const parts = html.split("not rendered");

// start a new express server
const app = express();
// statically serve everything in the dist directory
app.use("/dist", express.static("dist"));
//it's a middleware that's gonna run  every single time when it gets request
app.use((req, res) => {
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  // put 3 parts together
  res.send(`${parts[0]}${renderToString(reactMarkup)}${parts[1]}`);
  res.end();
});

console.log(`listening on ${PORT}`);
app.listen(PORT);
