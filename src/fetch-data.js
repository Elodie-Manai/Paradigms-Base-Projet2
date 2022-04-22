const { fromFetch } = require('rxjs/fetch')
const { switchMap, of, catchError } = require('rxjs')

/**
 * Récupère et agrège les données des capteurs
 * @returns Observable<any> les mesures des capteurs
 */
async function fetchData(url) {
  return fromFetch(url).pipe( 
      switchMap(response => response.ok ? response.json() : of({ error: true, message: `Error ${ response.status }` })), 
      catchError(err => of({ error: true, message: err.message })));
}

module.exports = fetchData;
