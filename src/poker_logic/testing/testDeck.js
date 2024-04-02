const { Deck } = require('../Deck');
const assert = require('assert');

const numCardsInDeck = 52;
const deck = new Deck();

assert.strictEqual(deck.length(), numCardsInDeck, 
    `Deck should initially have ${numCardsInDeck} cards`);

deck.print();
deck.shuffle();

while (deck.length() > 0) {
    deck.print();
    const card = deck.deal();
    console.log(card);
}