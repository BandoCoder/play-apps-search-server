const express = require("express");
const morgan = require("morgan");
const playstore = require("./playstore.js");

const app = express();

app.use(morgan("common"));

app.get("/apps", (req, res) => {
  const { sort, genre } = req.query;
  let result = playstore;

  if (genre) {
    if (
      !["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genre
      )
    ) {
      return res
        .status(400)
        .send(
          "Must include one of the following parameters: Action, Puzzle, Strategy, Casual, Arcade, or Card"
        );
    } else if (
      ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"].includes(
        genre
      )
    ) {
      result = playstore.filter((genre) => {
        return playstore.Genres === genre;
      });
    } else {
      result = playstore;
    }
  }

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must by rating or app");
    } else {
      result = playstore.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  }

  res.json(result);
});

app.listen(8000, () => {
  console.log("Good show bruv the server is running at http://localhost:8000");
});
