const createChart = require("./graph");
const { setGraphData, rowHtml, addDateProps } = require("./functions");
const {
  addLetterToHeros,
  sum,
  convertPerso,
  mapSuperior,
  filterSuperior,
  reduceSuperior,
  verifyPersoRole,
} = require("./superiorFunctions");
const { personnages } = require("./personnages");
const _ = require("lodash/fp");
const fetchData = require("./fetch-data");
const { combineLatest, map } = require("rxjs");




async function renderTable(mesuresUrlArray) {
  const cod$ = await fetchData(mesuresUrlArray.cod);
  const temperature$ = await fetchData(mesuresUrlArray.temperature);
  const noise$ = await fetchData(mesuresUrlArray.noise);

  combineLatest([cod$, temperature$, noise$]).pipe( map(([cod$, temperature$, noise$]) => ({cod: cod$, temperature: temperature$, noise: noise$})))
  .subscribe(data => {
    const divTable = document.getElementById("table");
    divTable.innerHTML = "";
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
  })
}

async function renderGraph(mesuresUrlArray) {
  if (window.chart) window.chart.destroy();
  const data$ = await fetchData(mesuresUrlArray.noise);
  data$.subscribe({next: response => {
    response = response.reduce((result, { valeur, timestamp }) => {
      const heure = new Date(timestamp).toLocaleTimeString("fr");
      return {
        ...result,
        [heure]: [...(result[heure] === undefined ? [] : result[heure]), valeur],
      };
    }, {});
    window.chart = createChart("myChart", setGraphData(response), "bruit");
  }});
}

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
    let bruitParHeure = filterSuperior(({ type }) => type === "noise")(data);
    bruitParHeure = bruitParHeure.reduce((result, { valeur, timestamp }) => {
      const heure = new Date(timestamp).toLocaleTimeString("fr");
      return {
        ...result,
        [heure]: [
          ...(result[heure] === undefined ? [] : result[heure]),
          valeur,
        ],
      };
    }, {});

    // const bruitParHeure = data
    //   .filter(({ type }) => type === "noise")
    //   .reduce((result, { valeur, timestamp }) => {
    //     const heure = new Date(timestamp).toLocaleTimeString("fr");
    //     return {
    //       ...result,
    //       [heure]: [
    //         ...(result[heure] === undefined ? [] : result[heure]),
    //         valeur,
    //       ],
    //     };
    //   }, {});

    // data.map((value) => addDateProps(value));
    mapSuperior((value) => addDateProps(value))(data);
    //console.log(mapSuperior((value) => addDateProps(value))(data));
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

  // console.log(addLetterToHeros((x) => "A" + x)("hero")(personnages));
  // console.log(addLetterToHeros((x) => "B" + x)("bad guy")(personnages));
  // console.log(addLetterToHeros((x) => "C" + x)("bad girl")(personnages));

  // console.log(sum(3)()());
  let sum12 = sum(12);
  // console.log(sum12(10)(10));
  let sum1212 = sum12(12);
  // console.log(sum1212(4));

  // console.log(personnages.map(convertPerso(({role}) => role === "hero", ({name}) => "Bad " + name)));
  // console.log(personnages.map(convertPerso(({role}) => role !== "hero", ({name}) => "Nice " + name)));

  // console.log('reduceSuperior', reduceSuperior((x, y) => x + y)([3, 8, 10]));
  // console.log('mapSuperior', mapSuperior(x => x * 2)([12, 15, 25]));
  // console.log('filterSuperior', filterSuperior(x => x % 2 !== 0)([3, 8, 10]));

  // console.log(personnages.group(perso => perso.universe === "DC"))
}
exports.renderPage = renderPage;
exports.renderGraph = renderGraph;
exports.renderTable = renderTable;
