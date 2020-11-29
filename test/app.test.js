const supertest = require("supertest");
const app = require("../app");
const { expect } = require("chai");

describe("GET/apps", () => {
  it("should return an array of apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          "App",
          "Category",
          "Rating",
          "Reviews",
          "Size",
          "Installs",
          "Type",
          "Price",
          "Content Rating",
          "Genres",
          "Last Updated",
          "Current Ver",
          "Android Ver"
        );
      });
  });

  it("returns 400 when sorting query is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "GOOFED" })
      .expect(400, "Must be sorted by rating or app name, nothing else");
  });

  it("returns 400 when genre selected is NOT a valid query", () => {
    return supertest(app)
      .get("/apps")
      .query({ genre: "GOOFED" })
      .expect(
        400,
        "Not a listed genre, please use: Action, Puzzle, Strategy, Casual, Arcade, or Card"
      );
  });
  it("should sort by app name", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "App" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;

        while (i < res.body.length - 1) {
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          if (appAtIPlus1.App < appAtI.App) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it("should sort by app rating", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "Rating" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;

        while (i < res.body.length - 1) {
          const ratingAtI = res.body[i];
          const ratingAtIPlus1 = res.body[i + 1];
          if (Number(ratingAtIPlus1.Rating) > Number(ratingAtI.Rating)) {
            sorted = false;
            break;
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
