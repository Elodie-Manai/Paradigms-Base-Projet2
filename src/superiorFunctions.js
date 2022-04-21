
//const res = mapValue(x => "a" +x, data)



function addLetterToHeros(fn, role) {
    let persos = filterByRole(role);
    persos = persos.map(perso => {
        perso = Object.entries(perso).map(([key, value]) => {
            return key === 'name' ? [key, fn(value)] : [key, value];
        })
        return Object.fromEntries(perso);
    });
    return persos
}

// convertBadToGood(({role})=> role !== 'hero', ({name}) => 'Nice' + name, personnages)

function convertPerso(checkIfBad, addNice, data) {
    return data.map((d) => {
        return { name:  checkIfBad(d) ? addNice(d) : d.name, role: d.role };
    });
}


function curriedConvertPerso () {}



const sum = (number1) => 
    (number2 = 12) => 
        (number3 = 12) => 
            number1 + number2 + number3;


// const addLetterToHeros2 = (role) => {
//     let persos = filterByRole(role);
//     return (fn) => {

//     }
// }


// function sum(number1) {
//     return function (number2) {
//         return function (number3) {
//             return number1 + number2 + number3;
//         }
//     }
// }

/**
 * curryfication test: filter perso and add string to name
 */
const personnages = [
    { "name": "batman", "role": "hero" },
    { "name": "iron-man", "role": "hero" },
    { "name": "green-lantern", "role": "hero" },
    { "name": "spider-man", "role": "hero" },
    { "name": "penguin", "role": "bad guy" },
    { "name": "joker", "role": "bad guy" },
    { "name": "harley quinn", "role": "bad girl" },
    { "name": "poison ivy", "role": "bad girl" }
]

const verifyPersoRole = (role, perso) => perso.role === role;

// function verifyPersoRole(role, perso) {
//     return perso.role === role;
// }

const filterByRole = (role) => personnages.filter(perso => verifyPersoRole(role, perso));

// function filterByRole(role) {
//     return personnages.filter(perso => verifyPersoRole(role, perso));
// }




/*
const res = {
    "hero": "abatman",
    "hero": "arobin"
} () => {}

*/

exports.sum = sum;
exports.addLetterToHeros = addLetterToHeros;
exports.convertPerso = convertPerso;
exports.personnages = personnages;


