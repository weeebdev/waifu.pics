const express = require("express");
const cors = require("cors");
const got = require("got");

const ENDPOINTS = require("./lib/endpoints.js");

const API_URL = "https://waifu.pics/api";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is a simple server to get images from waifu.pics",
  });
});

app.get("/:type/:endpoint", async (req, res) => {
  let endpoint = req.params.endpoint.toLocaleLowerCase();
  let type = req.params.type.toLocaleLowerCase();
  res.set("Cache-Control", "no-cache");
  if (ENDPOINTS[type].includes(endpoint)) {
    fetchImage(type, endpoint, res);
  } else if (endpoint === "random") {
    endpoint =
      ENDPOINTS[type][Math.floor(Math.random() * ENDPOINTS[type].length)];
    fetchImage(type, endpoint, res);
  } else {
    res.status(400).json({
      message: "Bad endpoint",
    });
  }
});

async function fetchImage(type, endpoint, response) {
  try {
    const { url } = await got(`${API_URL}/${type}/${endpoint}`).json();

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
