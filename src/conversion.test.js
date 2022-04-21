const { convertPerso, personnages } = require("./superiorFunctions");
var assert = require("assert");

describe("has conversion worked ?", () => {
  it("bad guys and girls will be converted :D", () => {
    const res = convertPerso(
      ({ role }) => role !== "hero",
      ({ name }) => "Nice " + name,
      personnages
    );

    assert.equal(
      JSON.stringify(res),
      JSON.stringify([
        { name: "batman", role: "hero" },
        { name: "iron-man", role: "hero" },
        { name: "green-lantern", role: "hero" },
        { name: "spider-man", role: "hero" },
        { name: "Nice penguin", role: "bad guy" },
        { name: "Nice joker", role: "bad guy" },
        { name: "Nice harley quinn", role: "bad girl" },
        { name: "Nice poison ivy", role: "bad girl" },
      ])
    );
  });

  it("good guys will be converted :D", () => {
    const res = convertPerso(
      ({ role }) => role === "hero",
      ({ name }) => "Bad " + name,
      personnages
    );

    assert.equal(
      JSON.stringify(res),
      JSON.stringify([
        { name: "Bad batman", role: "hero" },
        { name: "Bad iron-man", role: "hero" },
        { name: "Bad green-lantern", role: "hero" },
        { name: "Bad spider-man", role: "hero" },
        { name: "penguin", role: "bad guy" },
        { name: "joker", role: "bad guy" },
        { name: "harley quinn", role: "bad girl" },
        { name: "poison ivy", role: "bad girl" },
      ])
    );
  });
});
