const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const ENDPOINTS = require("./lib/endpoints.js");

const API_URL = "https://waifu.pics/api/";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is a simple server to get images from waifu.pics",
  });
});

app.get("/:endpoint", async (req, res) => {
  res.set("Cache-Control", "no-cache");
  if (ENDPOINTS.includes(req.params.endpoint.toLocaleLowerCase())) {
    fetchImage(req.params.endpoint.toLocaleLowerCase())
      .then((response) => {
        res.redirect(response.url);
      })
      .catch((err) =>
        res.status(500).json({
          message: err.message,
        })
      );
  } else if (req.params.endpoint.toLocaleLowerCase() === "random") {
    let endpoint = ENDPOINTS[
      Math.floor(Math.random() * ENDPOINTS.length)
    ].toLocaleLowerCase();
    fetchImage(endpoint)
      .then((response) => res.redirect(response.url))
      .catch((err) =>
        res.status(500).json({
          message: err.message,
        })
      );
  } else {
    res.status(400).json({
      message: "Bad endpoint",
    });
  }
});

function fetchImage(endpoint) {
  return fetch(`${API_URL}${endpoint}`).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      let result = await response.json();
      throw new Error(result.message);
    }
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening in port" + PORT);
});
