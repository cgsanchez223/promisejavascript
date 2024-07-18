// Part 1 - Numbers - Promises
let favNumber = 23;
let baseURL = "http://numbersapi.com";

// get facr on your favorite number
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
    console.log(data);
});
// {text: '23 is the number of times Julius Caesar was stabbed.', number: 23, found: true, type: 'trivia'}

// get data on muliple numbers
let multipleNumbers = [2, 4, 7];
$.getJSON(`${baseURL}/${multipleNumbers}?json`).then(data => {
    console.log(data);
});
// 2 is the first magic number in physics."
// 4 is the number of chambers the mammalian heart consists of.
// 7 is the number of main stars in the constellations of the Big Dipper and Orion.

//  4 facts on your favorite number.
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${baseURL}/${favNumber}?json`);
    })
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
// 23 is the number of crosses on Calvary in the Monty Python film Life Of Brian.
// 23 is the number of chromosomes normal human sex cells have.
// 23 is the number of times Julius Caesar was stabbed.
// 23 is the number of chromosomes normal human sex cells have.



