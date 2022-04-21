
//const res = mapValue(x => "a" +x, data)



function addLetterToHeros(fn, role) {
    let persos = filterByRole(role);
    persos = persos.map(perso => {
        perso = Object.entries(perso).map(([key, value]) => {
            return [key, fn(value)];
        })
        return Object.fromEntries(perso);
    });
    
    return persos
}



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

const filterByRole = (role) => personnages.filter(perso => verifyPersoRole(role, perso));





/*
const res = {
    "hero": "abatman",
    "hero": "arobin"
} () => {}

*/


exports.addLetterToHeros = addLetterToHeros;