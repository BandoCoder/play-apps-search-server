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
});
