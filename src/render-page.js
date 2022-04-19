const createChart = require("./graph");
const {
  setNoisePerHour,
  setGraphData,
  rowHtml
} = require("./functions");

/**
 * Génère le rendu de la page.
 * @param {import("../types").Mesure[]} data
 * @param {boolean} withGraph Pour les tests
 */
function renderPage(data, withGraph) {
  const divTable = document.getElementById('table');
  divTable.innerHTML = '';
  if (withGraph) {
    if (window.chart) window.chart.destroy();
    const bruitParHeure = {};

    data.filter(({type}) => type === "noise")
    .map(value => setNoisePerHour(value, bruitParHeure));
    const graphData = setGraphData(bruitParHeure);
    window.chart = createChart("myChart", graphData, "bruit");
  }
  const table = document.createElement('table');
  divTable.appendChild(table);
  table.innerHTML = `<table>
  <thead>
    <tr>
      <th>date</th>
      <th>capteur</th>
      <th>valeur</th>
    </tr>
  </thead> 
  ${rowHtml(data)}
  </table>`;
  
}
module.exports = renderPage;