// Part 2 - Deck of Cards - Promises
$(function() {
    let cardURL = 'https://deckofcardsapi.com/api/deck';

    // 1 - get single card from newely shuffled deck
    $.getJSON(`${cardURL}/new/draw/`).then(data => {
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
    // card is different every page refresh - 8 of hearts

    // 2 - draw 2 cards from same API
    let card1 = null;
    $.getJSON(`${cardURL}/new/draw/`)
      .then(data => {
        card1 = data.cards[0];
        let deck = data.deck_id
        return $.getJSON(`${cardURL}/${deck}/draw/`);
      })
      .then(data => {
        let card2 = data.cards[0];
        [card1, card2].forEach(function(card) {
            console.log(
                `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
      });
      // Examples are also random . card1 = 3 of hearts, card2 = jack of spades

      // 3 - build HTML page with card draw
      let fullDeck = null;
      let $btn = $('button');
      let $field = $('#field');

      $.getJSON(`${cardURL}/new/shuffle/`).then(data => {
        fullDeck = data.deck_id;
        $btn.show();
      });

      $btn.on('click', function() {
        $.getJSON(`${cardURL}/${fullDeck}/draw/`).then(data => {
            let cardimg = data.cards[0].image;
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
            if (data.remaining === 0) $btn.remove();
        });
      });
});