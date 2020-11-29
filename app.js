const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore.js");

const app = express();

app.use(morgan("common"));

app.get("/apps", (req, res) => {
  const { sort, genre = "" } = req.query;

  if (sort) {
    if (!["Rating", "App"].includes(sort)) {
      return res
        .status(400)
        .send("Must be sorted by rating or app name, nothing else");
    }
  }

  if (genre != "") {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genre
      )
    ) {
      return res
        .status(400)
        .send(
          "Not a listed genre, please use: Action, Puzzle, Strategy, Casual, Arcade, or Card"
        );
    }
  }

  let filtered = playstore.filter((app) => app.Genres.includes(genre));

  if (sort) {
    if (sort === "App") {
      filtered.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    } else if (sort === "Rating") {
      filtered.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });
    }
  }

  res.json(filtered);
});

module.exports = app
