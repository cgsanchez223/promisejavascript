/// async/await
let favNumber = 93;
let baseURL = "http://numbersapi.com";

// 1 - Favorite Number - async/await
async function Mika() {
    let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(data);
}
Mika();
// 93 is the atomic number of neptunium


// 2 - Multiple Number - async/await
const multipleNumbers = [18, 39, 46];
async function moreNumbers() {
    let data = await $.getJSON(`${baseURL}/${multipleNumbers}?json`);
    console.log(data);
}
moreNumbers();
// 18 is the number of colors the labels for Crayola crayons come in.
// 39 is the number of signers to the United States Constitution, out of 55 members of the Philadelphia Convention delegates.
// 46 is the number of slices of pizza an average American kid eats in a year.



// 3 - 4 facts of fav Number
async function manyTruths() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
    });
}
manyTruths();
// 93 is that approximate distance in millions of miles the Sun is away from the Earth.
// 93 is the atomic number of neptunium.
// 93 is the atomic number of neptunium.
// 93 is that approximate distance in millions of miles the Sun is away from the Earth.
