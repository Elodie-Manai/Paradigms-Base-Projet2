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

// group(x => x.valeur).by(y => `${y.date.heure}h`).

// function group(fn) {
//     this.group = fn;
//     this.by = (fn2) => {
//         return
//     }
// }

// ------------------- RECURSIVE FUNCTION -------------------

const reduceSuperiorNumber = (number) =>
  !number ? 0 : number + mapSuperior(number - 1);

const reduceSuperior = (fn) => ([first, ...rest], i = 0) => {
  return (first && reduceSuperior(fn)(rest, fn(first, i))) || [i];
  // before
  // return (rest.length === 1) ? fn(first, ...rest) : fn(first, i) + reduceSuperior(fn)(rest, fn(first, i));
};

const mapSuperior = (fn) => ([first, ...rest]) => {
    return (first && [fn(first), ...mapSuperior(fn)(rest)]) || [];

    // before
    // return (rest.length === 1) ? [fn(first), fn(rest)] : [fn(first), ...mapSuperior(fn)(rest)];
  };

const filterSuperior = (fn) => ([first, ...rest]) => {
    return (first && (fn(first) ? [first, ...filterSuperior(fn)(rest)] : [...filterSuperior(fn)(rest)])) || [];
    
    // before
    // if (rest.length === 1) return fn(rest) === 0 ? [first, ...rest] : [first];
    // return fn(first) === 0
    //   ? [first, ...filterSuperior(fn)(rest)]
    //   : [...filterSuperior(fn)(rest)];
  };

exports.sum = sum;
exports.addLetterToHeros = addLetterToHeros;
exports.convertPerso = convertPerso;
exports.reduceSuperior = reduceSuperior;
exports.mapSuperior = mapSuperior;
exports.filterSuperior = filterSuperior;
