// Part 2 - Card draws with Async/Await
$(function() {
    let cardURL = 'https://deckofcardsapi.com/api/deck';

    // 1 - get single card from newely shuffled deck
    async function draw() {
        let data = await $.getJSON(`${cardURL}/new/draw/`);
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
    draw(); // 7 of diamonds

    // 2 - draw 2 cards from same API
    async function draw2() {
        let firstDraw = await $.getJSON(`${cardURL}/new/draw`);
        let deck = firstDraw.deck_id;
        let secondDraw = await $.getJSON(`${cardURL}/${deck}/draw/`);
        [firstDraw, secondDraw].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    }
    draw2(); // king of clubs and 4 of hearts

    // 3 - build HTML page with card draw
    async function setup() {
        let $btn = $('button');
        let $field = $('#field')

        let fullDeck = await $.getJSON(`${cardURL}/new/shuffle`);
        $btn.show().on('click', async function() {
            let gameCard = await $.getJSON(`${cardURL}/${fullDeck.deck_id}/draw/`);
            let cardimg = gameCard.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $field.append(
                $('<img>', {
                    src: cardimg,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (gameCard.remaining === 0) $btn.remove();
        });
    }
    setup();
});