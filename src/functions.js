/**
 * set bruitParHeure[heure] with the mesure given in parameter
 * if bruitParHeure[heure] already has value in it then adds the new value in the array
 * else set the value in the array
 * 
 * @param {*} mesure 
 * @param {*} bruitParHeure 
 * @returns {}
 */
function setNoisePerHour(mesure, bruitParHeure) {
    const heure = new Date(mesure.timestamp).toLocaleTimeString("fr");
    bruitParHeure[heure] ? bruitParHeure[heure].push(mesure.valeur) : bruitParHeure[heure] = [mesure.valeur];
    return bruitParHeure;
}

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
    return data.map(value => `<tr data-id="${value.id}">
        <td>${value.timestamp}</td>
        <td>${value.type}</td>
        <td>${value.valeur}</td>
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

exports.setNoisePerHour = setNoisePerHour;
exports.setGraphData = setGraphData;
exports.rowHtml = rowHtml;