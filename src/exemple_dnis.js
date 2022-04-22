const { switchMap, catchError } = require("rxjs");
const { fromFetch } = require("rxjs/fetch");

async function getData() {
    return fromFetch("www.google.fr").pipe(
        switchMap("ok"),
        catchError("error")
    )
}

const getData$ = await getData();

getData$.subscribe({
    next: (val) => console.log(val),
    error: (err) => console.log(err),
    complete: () => console.log("complete")
});