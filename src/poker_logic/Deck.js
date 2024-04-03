const { suits, values, Card } = require('./Card');

class Deck {
    // creates 52 card deck
    constructor() {
        this.cards = [];

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(value, suit));
            }
        }
    }

    // shuffles deck using Fischer-Yates method
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // pops card from back of deck and returns it
    deal() {
        if (this.cards.length === 0) {
            throw new Error('Can\'t deal card from an empty deck');
        }
        return this.cards.pop();
    }

    length() {
        return this.cards.length;
    }

    print() {
        this.cards.forEach(card => card.print());
        console.log();
    }
}

module.exports = { Deck };