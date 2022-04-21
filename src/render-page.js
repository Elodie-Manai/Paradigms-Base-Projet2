const createChart = require("./graph");
const { setGraphData, rowHtml, addDateProps } = require("./functions");
const { addLetterToHeros, sum, convertPerso, mapSuperior, filterSuperior } = require("./superiorFunctions");
const { personnages } = require('./personnages');

Array.prototype.group = (fn) => {
  return fn
};
Array.prototype.by = (fn) => fn;
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

    const bruitParHeure = data
      .filter(({ type }) => type === "noise")
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

    data.map((value) => addDateProps(value));

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


  console.log(addLetterToHeros((x) => "A" + x)("hero")(personnages));
  console.log(addLetterToHeros((x) => "B" + x)("bad guy")(personnages));
  console.log(addLetterToHeros((x) => "C" + x)("bad girl")(personnages));

  console.log(sum(3)()());
  let sum12 = sum(12);
  console.log(sum12(10)(10));
  let sum1212 = sum12(12);
  console.log(sum1212(4));


  console.log(personnages.map(convertPerso(({role}) => role === "hero", ({name}) => "Bad " + name)));
  console.log(personnages.map(convertPerso(({role}) => role !== "hero", ({name}) => "Nice " + name)));

  console.log(mapSuperior(x => x * 2)([3, 8, 10]));
  console.log(mapSuperior(x => x * 2)([12, 15, 25]));
  console.log(filterSuperior(x => x % 2)([3, 8, 10]));

  // console.log(personnages.group(perso => perso.universe === "DC"))

}
module.exports = renderPage;
