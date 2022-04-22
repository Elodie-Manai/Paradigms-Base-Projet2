const fetchData = require('./fetch-data');
const { renderTable, renderGraph, } = require('./render-page');
const { switchMap, of, catchError } = require('rxjs');
const { fromFetch } = require('rxjs/fetch')

const mesuresUrl = {
  cod: '/api/cod.json',
  temperature: '/api/temperature.json',
  noise: '/api/noise.json'
}

const mesureUrl = {
  noise: 'http://localhost:1234/noise/0'
}


document.addEventListener('DOMContentLoaded', async function () {
  renderTable(mesuresUrl);
  renderGraph(mesuresUrl);

  const data$ = await fetchData(mesureUrl.noise);

  data$.subscribe((data) => console.log('1234', data))
});

// async function update() {
//   const data = await fetchData();
//   // renderPage(data, true);
//   renderTable(data);
//   renderGraph(data);
// }
