const createChart = require("./graph");
const { setGraphData, rowHtml } = require("./functions");

/**
 * Génère le rendu de la page.
 * @param {import("../types").Mesure[]} data
 * @param {boolean} withGraph Pour les tests
 */
function renderPage(data, withGraph) {
  const divTable = document.getElementById("table");
  divTable.innerHTML = "";
  if (withGraph) {
    if (window.chart) window.chart.destroy();

    const bruitParHeure = data.filter(({ type }) => type === "noise")
      .reduce((result, { valeur, timestamp }) => {
        const heure = new Date(timestamp).toLocaleTimeString("fr");
        return {
          ...result,
          [heure]: [
            ...(result[heure] === undefined ? [] : result[heure]),
            valeur,
          ],
        };
      }, {});

    window.chart = createChart("myChart", setGraphData(bruitParHeure), "bruit");
  }
  const table = document.createElement("table");
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
