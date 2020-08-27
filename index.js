const express = require("express");
const cors = require("cors");
const ENDPOINTS = require("./lib/endpoints.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "This is a simple server to get images from waifu.pics",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening in port" + PORT);
});
