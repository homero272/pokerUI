const { Card } = require('./Card');
const { Deck } = require('./Deck');
const assert = require('assert');

const numCardsInPokerHand = 5;

/**
 * enumerates the possible hand ranks
 * 
 *      TsJsQsKsAs - Royal Flush 
 *      4c5c6c7c8c - Straight Flush
 *      9c9d9h9sQh - Four of a Kind
 *      9c9d9hQdQs - Full House
 *      2h6hJhQhAh - Flush
 *      8d9cTcJsQh - Straight
 *      5c5d5s7sKh - Three of a Kind
 *      6h6s8d8sJd - Two Pair
 *      3d7sJdAdAh - Pair
 *      4s8d9cJhAc - No Pair/High Card
 */
const handRanks = [
    'Royal Flush',
    'Straight Flush',
    'Four of a Kind',
    'Full House',
    'Flush',
    'Straight',
    'Three of a Kind',
    'Two Pair',
    'Pair', 
    'High Card'
]

class PokerHand {
    constructor(cards) {
        this.cards = this.sortCards(cards);

        // 2x3x4x5xAx -> Ax2x3x4x5x
        if (this.isWheelStraight()) 
            this.cards.unshift(this.cards.pop());

        if (this.isStraight() && this.isFlush()) {
            // TsJsQsKsAs
            if (this.cards[0].value === 'T' && this.cards[4].value === 'A') {
                // royal flush
                this.rank = 0;
                this.hand = handRanks[0];
            } else {
                // straight flush
                this.rank = 1;
                this.hand = handRanks[1];
            }

        } else if (this.isQuads()) {

            // QQQQX -> XQQQQ
            if (this.cards[0].value === this.cards[3].value)
                this.cards.unshift(this.cards.pop());
            // four of a kind
            this.rank = 2;
            this.hand = handRanks[2];

        } else if (this.isFullHouse()) {

            // JJJQQ -> QQJJJ
            if (this.cards[0].value === this.cards[2].value) {
                this.cards.unshift(this.cards.pop());
                this.cards.unshift(this.cards.pop());
            }
            // full house
            this.rank = 3;
            this.hand = handRanks[3];

        } else if (this.isFlush()) {

            // flush
            this.rank = 4;
            this.hand = handRanks[4];

        } else if (this.isStraight()) {

            // straight
            this.rank = 5;
            this.hand = handRanks[5];

        } else if (this.isTrips()) {

            // 888XX -> XX888
            if (this.cards[0].value === this.cards[2].value) {
                this.cards.unshift(this.cards.pop());
                this.cards.unshift(this.cards.pop());
            }
            // X888X -> XX888
            if (this.cards[1].value === this.cards[3].value) 
                this.cards.unshift(this.cards.pop());
            // three of a kind
            this.rank = 6;
            this.hand = handRanks[6];

        } else if (this.isTwoPair()) {

            // 33JJX -> X33JJ
            if (this.cards[0].value === this.cards[1].value &&
                this.cards[2].value === this.cards[3].value)
                this.cards.unshift(this.cards.pop());
            // 33XJJ -> X33JJ
            if (this.cards[0].value === this.cards[1].value &&
                this.cards[3].value === this.cards[4].value)
                [this.cards[0], this.cards[2]] = [this.cards[2], this.cards[0]];
            // two pair
            this.rank = 7;
            this.hand = handRanks[7];

        } else if (this.isPair()) {

            // 99XYZ -> XYZ99
            if (this.cards[0].value === this.cards[1].value) {
                this.cards.unshift(this.cards.pop());
                this.cards.unshift(this.cards.pop());
                this.cards.unshift(this.cards.pop());
            }
            // X99YZ -> XYZ99
            if (this.cards[1].value === this.cards[2].value) {
                [this.cards[1], this.cards[3]] = [this.cards[3], this.cards[1]];
                [this.cards[2], this.cards[4]] = [this.cards[4], this.cards[2]];
            }
            // XY99Z -> XYZ99
            if (this.cards[2].value === this.cards[3].value) {
                [this.cards[2], this.cards[4]] = [this.cards[4], this.cards[2]];
            }
            // pair
            this.rank = 8;
            this.hand = handRanks[8];

        } else {

            // no pair/high card
            this.rank = 9;
            this.hand = handRanks[9];

        }
    }

    // sorts cards by value then suit without modifying cards param
    sortCards(cards) {
        const sortedCards = cards.slice();

        return sortedCards.sort((a, b) => {
            // sort by value of card first (2 < 3 < 4 < ... < Q < K < A)
            const valueOrder = this.getValueOrder(a) - this.getValueOrder(b);
            
            // sort by suit if cards have same value (c < d < h < s)
            if (valueOrder === 0) 
                return a.suit.localeCompare(b.suit);
            
            return valueOrder;
        });
    }

    // helper function for sortCards that returns a number based on the
    // card's value
    getValueOrder(card) {
        switch (card.value) {
            case 'A': return 14;    // Ace
            case 'K': return 13;    // King
            case 'Q': return 12;    // Queen
            case 'J': return 11;    // Jack
            case 'T': return 10;    // Ten
            default: return parseInt(card.value);
        }
    }

    // helper function print that returns full name of card's value
    getValueName(card) {
        switch (card.value) {
            case 'A': return 'Ace';    
            case 'K': return 'King';    
            case 'Q': return 'Queen';    
            case 'J': return 'Jack';    
            case 'T': return 'Ten';   
            case '9': return 'Nine';
            case '8': return 'Eight';
            case '7': return 'Seven';
            case '6': return 'Six';
            case '5': return 'Five';
            case '4': return 'Four';
            case '3': return 'Three';
            case '2': return 'Two';
        }
    }

    print() {
        this.cards.forEach(card => {
            card.print();
        });

        let output = ` ~ ${this.hand} ~ `;

        switch (this.hand) {
            case 'Royal Flush':
                break;
            case 'Straight Flush':
                output += `${this.getValueName(this.cards[0])} to ` +
                `${this.getValueName(this.cards[4])}`;
                break;
            case 'Four of a Kind': 
                output += this.cards[4].value === '6' ?
                `${this.getValueName(this.cards[4])}es` :
                `${this.getValueName(this.cards[4])}s`;
                break;
            case 'Full House':
                output += this.cards[4].value === '6' ?
                `${this.getValueName(this.cards[4])}es ` :
                `${this.getValueName(this.cards[4])}s `;
                output += 'full of ';
                output += this.cards[1].value === '6' ?
                `${this.getValueName(this.cards[1])}es` :
                `${this.getValueName(this.cards[1])}s`;
                break;
            case 'Flush':
                output +=`${this.getValueName(this.cards[4])} high`;
                break;
            case 'Straight':
                output += `${this.getValueName(this.cards[0])} to ` +
                `${this.getValueName(this.cards[4])}`;
                break;
            case 'Three of a Kind':
                output += this.cards[4].value === '6' ?
                `${this.getValueName(this.cards[4])}es` :
                `${this.getValueName(this.cards[4])}s`;
                break;
            case 'Two Pair':
                output += this.cards[4].value === '6' ?
                `${this.getValueName(this.cards[4])}es ` :
                `${this.getValueName(this.cards[4])}s `;
                output += 'and ';
                output += this.cards[1].value === '6' ?
                `${this.getValueName(this.cards[4])}es` :
                `${this.getValueName(this.cards[4])}s`;
                break;
            case 'Pair':
                output += this.cards[4].value === '6' ?
                `${this.getValueName(this.cards[4])}es` :
                `${this.getValueName(this.cards[4])}s`;
                break;
            case 'High Card':
                output +=`${this.getValueName(this.cards[4])}`;
                break;
        }

        console.log(output);
    }

    // compares two PokerHand objects
    // the lower the rank, the stronger the hand
    compareWith(otherHand) {
        // this hand is stronger, other hand is weaker
        if (this.rank < otherHand.rank)
            return 1; 
        // this hand is weaker, other hand is stronger
        if (this.rank > otherHand.rank) 
            return -1; 
        // both hands have the same rank, compare the highest cards
        // the higher the card, the stronger the hand
        for (let i = numCardsInPokerHand - 1; i >= 0; i--) {
            const thisCardValue = this.getValueOrder(this.cards[i]);
            const otherCardValue = otherHand.getValueOrder(otherHand.cards[i]);
            // this hand is weaker, other hand is stronger
            if (thisCardValue < otherCardValue) 
                return -1; 
            // this hand is stronger, other hand is weaker
            if (thisCardValue > otherCardValue) 
                return 1; 
        }
        // tie 
        // both hands equally as strong
        return 0;
    }
 
    /* methods for determining poker hand */

    isQuads() {
        assert.strictEqual(this.cards.length, numCardsInPokerHand, 
        `Poker hand should have ${numCardsInPokerHand} cards`);

        return this.cards[0].value === this.cards[3].value ||
               this.cards[1].value === this.cards[4].value;
    }

    isFullHouse() {
        assert.strictEqual(this.cards.length, numCardsInPokerHand, 
        `Poker hand should have ${numCardsInPokerHand} cards`);

        return (this.cards[0].value === this.cards[1].value &&
                this.cards[2].value === this.cards[4].value) ||
               (this.cards[0].value === this.cards[2].value &&
                this.cards[3].value === this.cards[4].value);
    }

    isFlush() {
        assert.strictEqual(this.cards.length, numCardsInPokerHand, 
        `Poker hand should have ${numCardsInPokerHand} cards`);

        for (let i = 1; i < numCardsInPokerHand; i++) {
            if (this.cards[i].suit !== this.cards[i - 1].suit)
                return false;
        }

        return true;
    }

    isStraight() {
        assert.strictEqual(this.cards.length, numCardsInPokerHand, 
        `Poker hand should have ${numCardsInPokerHand} cards`);

        if (this.isWheelStraight())
            return true;

        for (let i = 1; i < numCardsInPokerHand; i++) {
            const currentCardValue = this.getValueOrder(this.cards[i]);
            const previousCardValue = this.getValueOrder(this.cards[i - 1]);

            if (currentCardValue !== previousCardValue + 1)
                return false;
        }

        return true;
    }

    // checks if cards is a wheel straight - Ax2x3x4x5x or 2x3x4x5xAx
    isWheelStraight() {
        assert.strictEqual(this.cards.length, numCardsInPokerHand, 
        `Poker hand should have ${numCardsInPokerHand} cards`);

        return (this.cards[0].value === 'A' &&
                this.cards[1].value === '2' &&
                this.cards[2].value === '3' &&
                this.cards[3].value === '4' &&
                this.cards[4].value === '5') ||

               (this.cards[0].value === '2' &&
                this.cards[1].value === '3' &&
                this.cards[2].value === '4' &&
                this.cards[3].value === '5' &&
                this.cards[4].value === 'A');
    }

    isTrips() {
        return this.cards[0].value === this.cards[2].value || 
               this.cards[1].value === this.cards[3].value || 
               this.cards[2].value === this.cards[4].value;   
    }

    isTwoPair() {
        return (this.cards[1].value === this.cards[2].value &&
                this.cards[3].value === this.cards[4].value) ||
               (this.cards[0].value === this.cards[1].value &&
               (this.cards[2].value === this.cards[3].value ||
                this.cards[3].value === this.cards[4].value));
    }

    isPair() {
        for (let i = 1; i < numCardsInPokerHand; i++) {
            if (this.cards[i].value === this.cards[i - 1].value)
                return true;
        }

        return false;
    }
}

module.exports = { PokerHand };