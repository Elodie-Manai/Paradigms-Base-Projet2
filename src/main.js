const fetchData = require("./fetch-data");
const { renderPage, renderTable, renderGraph, } = require("./render-page");
const { interval,  } = require('rxjs');

document.addEventListener("DOMContentLoaded", async function () {
  const data = await fetchData();
  renderTable(data);
  renderGraph(data);
});

// async function update() {
//   const data = await fetchData();
//   // renderPage(data, true);
//   renderTable(data);
//   renderGraph(data);
// }
