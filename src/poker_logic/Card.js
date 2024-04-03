const suits = [
    'c',    // club
    'd',    // diamond
    'h',    // heart
    's'     // spade
];

const values = [
    '2',    
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',    // 10
    'J',    // Jack
    'Q',    // Queen
    'K',    // King
    'A'     // Ace
];

class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }

    print() {
        process.stdout.write(`${this.value}${this.suit}`);
    }
}

module.exports = { suits, values, Card };