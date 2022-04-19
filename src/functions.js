
/**
 * set graphData with the bruitParHeure given in parameter
 * 
 * @param {*} bruitParHeure 
 * @returns {}
 */
function setGraphData(bruitParHeure) {
    const graphData = {};
    const keys = Object.keys(bruitParHeure);
    keys.map((key) => {
        const sommeMesures = bruitParHeure[key].reduce((result, item) => result + item);
        graphData[key] = average(sommeMesures, bruitParHeure[key].length);
    });
    return graphData;
}

/**
 * take an array of data and return the html structure of html table
 * 
 * @param {*} data 
 * @returns string
 */
function rowHtml(data) {
    return data.map(({id, valeur, timestamp, type}) => `<tr data-id="${id}">
        <td>${timestamp}</td>
        <td>${type}</td>
        <td>${valeur}</td>
    </tr>`).join('');
}

/**
 * take an addition and an array length as parameters and return average value
 * 
 * @param {*} addition 
 * @param {*} length 
 * @returns number
 */
function average(addition, length) {
    return addition / length;
}

/**
 * take an object with timestamp attribute and return data object {frDate, day, month, year, hour}
 * 
 * @param {*} mesure 
 * @returns {}
 */
function addDateProps({timestamp}) {
    const date = new Date(timestamp);
    const [frDate, day, month, year, time] = [
        date.toLocaleDateString("fr"),
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.toLocaleTimeString('fr')
    ]
    return {
        frDate, day, month, year, time
    };
}



exports.setGraphData = setGraphData;
exports.rowHtml = rowHtml;
exports.addDateProps = addDateProps;


// data:
// [
//     {
//       "id": 1,
//       "valeur": 1.11,
//       "timestamp": "2022-02-09T08:30:59",
//       "type": "cod"
//     },
//     {
//       "id": 2,
//       "valeur": 10,
//       "timestamp": "2022-02-09T08:30:59",
//       "type": "temperature"
//     },
//     {
//       "id": 3,
//       "valeur": 10,
//       "timestamp": "2022-02-09T08:30:59",
//       "type": "noise"
//     }
//   ]