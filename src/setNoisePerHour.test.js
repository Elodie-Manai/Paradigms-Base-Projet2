
var assert = require("assert");
const { setNoisePerHour } = require('./functions');

// Test unitaire

describe("setNoisePerHour", () => {
  it("set noise per hour when bruitParHeure[heure] has already an entry", () => {
    // Given
    const mesure = {id: 3, timestamp: "2022-02-09T08:30:59", type: "noise", valeur: 10};
    let bruitParHeure = {"08:30:59": [ 10 ]};
    // When
    bruitParHeure = setNoisePerHour(mesure, bruitParHeure);
    // Then
    assert.equal(bruitParHeure["08:30:59"][0], 10);
    assert.equal(bruitParHeure["08:30:59"][1], 10);
  });

  it("set noise per hour when bruitParHeure[heure] has no entry", () => {
    // Given
    const mesure = {id: 3, timestamp: "2022-02-09T08:30:59", type: "noise", valeur: 10};
    let bruitParHeure = {"08:30:59": []};
    // When
    bruitParHeure = setNoisePerHour(mesure, bruitParHeure);
    // Then
    assert.equal(bruitParHeure["08:30:59"][0], 10);

  });

});