
//const res = mapValue(x => "a" +x, data)



function addLetterToHeros(fn, heros) {
    herosArray = Object.entries(heros).map(([key, value]) => {
        return [key, fn(value)];
    });
    return Object.fromEntries(herosArray);
}

/*
const res = {
    "hero": "abatman",
    "hero": "arobin"
}

*/

exports.addLetterToHeros = addLetterToHeros;