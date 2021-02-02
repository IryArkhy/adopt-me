import express from "express";
import React from "react";
// NEW API
// instead of sending a one huge payload all at once, you can send it by pieces - progreasive loading
import { renderToNodeStream } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));

app.use((req, res) => {
  // send this part first
  res.write(parts[0]);

  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  // this will progreasively gives you data over time
  const stream = renderToNodeStream(reactMarkup);

  // connect 2 pipes, put all the markup into the response to the user, but do not end it once it's done
  stream.pipe(res, { end: false });

  // once you've finished, write the other bit of the html and THEN cut the connection
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on ${PORT}`);
app.listen(PORT);
