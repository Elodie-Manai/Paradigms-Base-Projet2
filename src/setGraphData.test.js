var assert = require("assert");
const { setGraphData } = require('./functions');


// Test unitaire

describe("setGraphData tests", () => {
    it("Simple graph fill", () => {
        timeNoise = { '14:17:39': [12] };
        graph = setGraphData(timeNoise);
        assert.deepEqual(graph, { '14:17:39': 12 });
    });
    it("Advanced graph fill", () => {
        timeNoise = {'14:17:39': [12, 14, 5]};
        graph = setGraphData(timeNoise);
        assert.deepEqual(graph, { '14:17:39': 31/3 });
    });
  });
