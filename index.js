const express = require("express");
const cors = require("cors");
const got = require("got");

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
    fetchImage(req.params.endpoint.toLocaleLowerCase(), res);
  } else if (req.params.endpoint.toLocaleLowerCase() === "random") {
    let endpoint = ENDPOINTS[
      Math.floor(Math.random() * ENDPOINTS.length)
    ].toLocaleLowerCase();
    fetchImage(endpoint, res);
  } else {
    res.status(400).json({
      message: "Bad endpoint",
    });
  }
});

async function fetchImage(endpoint, response) {
  try {
    const { url } = await got(`${API_URL}${endpoint}`).json();

    got
      .stream(url)
      .on("response", (response) => {
        response.headers["cache-control"] = "no-cache";
      })
      .pipe(response);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening in port" + PORT);
});
