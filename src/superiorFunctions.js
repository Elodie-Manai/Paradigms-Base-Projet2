const { personnages } = require("./personnages");

//const res = mapValue(x => "a" +x, data)

const addLetterToHeros = (fn) => (role) => (array) => {
    let persos = filterByRole(role)(array);
    persos = persos.map((perso) => {
        perso = Object.entries(perso).map(([key, value]) => {
        return key === "name" ? [key, fn(value)] : [key, value];
        });
        return Object.fromEntries(perso);
    });
    return persos;
};


const convertPerso = (checkRole, addNice) => (perso) => {
  return {
    name: checkRole(perso) ? addNice(perso) : perso.name,
    role: perso.role,
    universe: perso.universe,
  };
};

const sum =
  (number1) =>
  (number2 = 12) =>
  (number3 = 12) =>
    number1 + number2 + number3;

const verifyPersoRole = (role, perso) => perso.role === role;

// function verifyPersoRole(role, perso) {
//     return perso.role === role;
// }

const filterByRole = (role) => (array) =>
  array.filter((perso) => verifyPersoRole(role, perso));

// function filterByRole(role) {
//     return personnages.filter(perso => verifyPersoRole(role, perso));
// }

exports.sum = sum;
exports.addLetterToHeros = addLetterToHeros;
exports.convertPerso = convertPerso;
