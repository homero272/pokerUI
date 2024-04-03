const { Card } = require('../Card');
const { Deck } = require('../Deck');
const { PokerHand } = require('../PokerHand');
const assert = require('assert');

const pokerHand1 = new PokerHand([
    new Card('J', 's'),
    new Card('K', 's'),
    new Card('Q', 's'),
    new Card('A', 's'),
    new Card('T', 's'),
]);

const pokerHand2 = new PokerHand([
    new Card('J', 'h'),
    new Card('K', 'h'),
    new Card('Q', 'h'),
    new Card('A', 'h'),
    new Card('T', 'h'),
]);

const pokerHand3 = new PokerHand([
    new Card('J', 'h'),
    new Card('K', 'h'),
    new Card('Q', 'h'),
    new Card('9', 'h'),
    new Card('T', 'h'),
]);

const pokerHand4 = new PokerHand([
    new Card('J', 'h'),
    new Card('8', 'h'),
    new Card('Q', 'h'),
    new Card('9', 'h'),
    new Card('T', 'h'),
]);

const pokerHand5 = new PokerHand([
    new Card('3', 'h'),
    new Card('4', 'h'),
    new Card('2', 'h'),
    new Card('6', 'h'),
    new Card('5', 'h'),
]);

const pokerHand6 = new PokerHand([
    new Card('3', 'h'),
    new Card('4', 'h'),
    new Card('2', 'h'),
    new Card('A', 'h'),
    new Card('5', 'h'),
]);

const pokerHand7 = new PokerHand([
    new Card('3', 'd'),
    new Card('4', 'd'),
    new Card('2', 'd'),
    new Card('A', 'd'),
    new Card('5', 'd'),
]);

const pokerHand8 = new PokerHand([
    new Card('A', 's'),
    new Card('A', 'c'),
    new Card('A', 'h'),
    new Card('A', 'd'),
    new Card('K', 's'),
]);

const pokerHand9 = new PokerHand([
    new Card('A', 's'),
    new Card('A', 'c'),
    new Card('A', 'h'),
    new Card('A', 'd'),
    new Card('Q', 's'),
]);

const pokerHand10 = new PokerHand([
    new Card('A', 's'),
    new Card('A', 'c'),
    new Card('A', 'h'),
    new Card('A', 'd'),
    new Card('J', 's'),
]);

const pokerHand11 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('K', 'h'),
    new Card('K', 'd'),
    new Card('A', 's'),
]);

const pokerHand12 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('K', 'h'),
    new Card('K', 'd'),
    new Card('Q', 's'),
]);

const pokerHand13 = new PokerHand([
    new Card('3', 's'),
    new Card('3', 'c'),
    new Card('3', 'h'),
    new Card('3', 'd'),
    new Card('A', 's'),
]);

const pokerHand14 = new PokerHand([
    new Card('3', 's'),
    new Card('3', 'c'),
    new Card('3', 'h'),
    new Card('3', 'd'),
    new Card('K', 's'),
]);

const pokerHand15 = new PokerHand([
    new Card('3', 's'),
    new Card('3', 'c'),
    new Card('3', 'h'),
    new Card('3', 'd'),
    new Card('2', 's'),
]);

const pokerHand16 = new PokerHand([
    new Card('2', 's'),
    new Card('2', 'c'),
    new Card('2', 'h'),
    new Card('2', 'd'),
    new Card('A', 's'),
]);

const pokerHand17 = new PokerHand([
    new Card('2', 's'),
    new Card('2', 'c'),
    new Card('2', 'h'),
    new Card('2', 'd'),
    new Card('K', 's'),
]);

const pokerHand18 = new PokerHand([
    new Card('2', 's'),
    new Card('2', 'c'),
    new Card('2', 'h'),
    new Card('2', 'd'),
    new Card('4', 's'),
]);

const pokerHand19 = new PokerHand([
    new Card('2', 's'),
    new Card('2', 'c'),
    new Card('2', 'h'),
    new Card('2', 'd'),
    new Card('3', 's'),
]);

const pokerHand20 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('A', 'h'),
    new Card('A', 'd'),
    new Card('A', 's'),
]);

const pokerHand21 = new PokerHand([
    new Card('Q', 's'),
    new Card('Q', 'c'),
    new Card('A', 'h'),
    new Card('A', 'd'),
    new Card('A', 's'),
]);

const pokerHand22 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('K', 'h'),
    new Card('A', 'd'),
    new Card('A', 's'),
]);

const pokerHand23 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('K', 'h'),
    new Card('2', 'd'),
    new Card('2', 's'),
]);

const pokerHand24 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('3', 'h'),
    new Card('3', 'd'),
    new Card('3', 's'),
]);

const pokerHand25 = new PokerHand([
    new Card('K', 's'),
    new Card('K', 'c'),
    new Card('2', 'h'),
    new Card('2', 'd'),
    new Card('2', 's'),
]);

const pokerHand26 = new PokerHand([
    new Card('J', 's'),
    new Card('J', 'c'),
    new Card('2', 'h'),
    new Card('2', 'd'),
    new Card('2', 's'),
]);

const pokerHand27 = new PokerHand([
    new Card('A', 'c'),
    new Card('3', 'c'),
    new Card('7', 'c'),
    new Card('J', 'c'),
    new Card('K', 'c'),
]);

const pokerHand28 = new PokerHand([
    new Card('A', 's'),
    new Card('3', 's'),
    new Card('7', 's'),
    new Card('J', 's'),
    new Card('K', 's'),
]);

const pokerHand29 = new PokerHand([
    new Card('A', 's'),
    new Card('2', 's'),
    new Card('7', 's'),
    new Card('J', 's'),
    new Card('K', 's'),
]);

const pokerHand30 = new PokerHand([
    new Card('A', 's'),
    new Card('2', 's'),
    new Card('5', 's'),
    new Card('J', 's'),
    new Card('K', 's'),
]);

const pokerHand31 = new PokerHand([
    new Card('Q', 'd'),
    new Card('2', 'd'),
    new Card('5', 'd'),
    new Card('J', 'd'),
    new Card('K', 'd'),
]);

const pokerHand32 = new PokerHand([
    new Card('Q', 'd'),
    new Card('2', 'd'),
    new Card('5', 'd'),
    new Card('8', 'd'),
    new Card('K', 'd'),
]);

const pokerHand33 = new PokerHand([
    new Card('Q', 'd'),
    new Card('2', 'd'),
    new Card('5', 'd'),
    new Card('8', 'd'),
    new Card('7', 'd'),
]);

const pokerHand34 = new PokerHand([
    new Card('T', 'h'),
    new Card('2', 'h'),
    new Card('5', 'h'),
    new Card('8', 'h'),
    new Card('7', 'h'),
]);

const pokerHand35 = new PokerHand([
    new Card('T', 'h'),
    new Card('2', 'h'),
    new Card('5', 'h'),
    new Card('3', 'h'),
    new Card('7', 'h'),
]);

const pokerHand36 = new PokerHand([
    new Card('8', 'h'),
    new Card('2', 'h'),
    new Card('5', 'h'),
    new Card('3', 'h'),
    new Card('7', 'h'),
]);

const pokerHand99 = new PokerHand([
    new Card('4', 's'),
    new Card('3', 's'),
    new Card('A', 's'),
    new Card('5', 's'),
    new Card('2', 's'),
]);

pokerHand1.print();
pokerHand2.print();
pokerHand3.print();
pokerHand4.print();
pokerHand5.print();
pokerHand6.print();
pokerHand7.print();
pokerHand8.print();
pokerHand9.print();
pokerHand10.print();
pokerHand11.print();
pokerHand12.print();
pokerHand13.print();
pokerHand14.print();
pokerHand15.print();
pokerHand16.print();
pokerHand17.print();
pokerHand18.print();
pokerHand19.print();
pokerHand20.print();
pokerHand21.print();
pokerHand22.print();
pokerHand23.print();
pokerHand24.print();
pokerHand25.print();
pokerHand26.print();
pokerHand27.print();
pokerHand28.print();
pokerHand29.print();
pokerHand30.print();
pokerHand31.print();
pokerHand32.print();
pokerHand33.print();
pokerHand34.print();
pokerHand35.print();
pokerHand36.print();

assert.strictEqual(pokerHand1.compareWith(pokerHand2), 0);
assert.strictEqual(pokerHand1.compareWith(pokerHand3), 1);
assert.strictEqual(pokerHand3.compareWith(pokerHand2), -1);
assert.strictEqual(pokerHand3.compareWith(pokerHand4), 1);
assert.strictEqual(pokerHand3.compareWith(pokerHand5), 1);
assert.strictEqual(pokerHand5.compareWith(pokerHand4), -1);
assert.strictEqual(pokerHand6.compareWith(pokerHand5), -1);
assert.strictEqual(pokerHand5.compareWith(pokerHand6), 1);
assert.strictEqual(pokerHand1.compareWith(pokerHand6), 1);
assert.strictEqual(pokerHand6.compareWith(pokerHand1), -1);
assert.strictEqual(pokerHand7.compareWith(pokerHand6), 0);
assert.strictEqual(pokerHand8.compareWith(pokerHand9), 1);
assert.strictEqual(pokerHand8.compareWith(pokerHand10), 1);
assert.strictEqual(pokerHand8.compareWith(pokerHand11), 1);
assert.strictEqual(pokerHand8.compareWith(pokerHand12), 1);
assert.strictEqual(pokerHand9.compareWith(pokerHand8), -1);
assert.strictEqual(pokerHand9.compareWith(pokerHand10), 1);
assert.strictEqual(pokerHand10.compareWith(pokerHand8), -1);
assert.strictEqual(pokerHand10.compareWith(pokerHand9), -1);
assert.strictEqual(pokerHand10.compareWith(pokerHand11), 1);
assert.strictEqual(pokerHand10.compareWith(pokerHand12), 1);
assert.strictEqual(pokerHand11.compareWith(pokerHand12), 1);
assert.strictEqual(pokerHand12.compareWith(pokerHand11), -1);
assert.strictEqual(pokerHand12.compareWith(pokerHand10), -1);
assert.strictEqual(pokerHand12.compareWith(pokerHand9), -1);
assert.strictEqual(pokerHand13.compareWith(pokerHand12), -1);
assert.strictEqual(pokerHand13.compareWith(pokerHand14), 1);
assert.strictEqual(pokerHand15.compareWith(pokerHand14), -1);
assert.strictEqual(pokerHand15.compareWith(pokerHand16), 1);
assert.strictEqual(pokerHand15.compareWith(pokerHand17), 1);
assert.strictEqual(pokerHand17.compareWith(pokerHand14), -1);
assert.strictEqual(pokerHand18.compareWith(pokerHand17), -1);
assert.strictEqual(pokerHand17.compareWith(pokerHand18), 1);
assert.strictEqual(pokerHand17.compareWith(pokerHand19), 1);
assert.strictEqual(pokerHand19.compareWith(pokerHand17), -1);
assert.strictEqual(pokerHand19.compareWith(pokerHand18), -1);
assert.strictEqual(pokerHand19.compareWith(pokerHand20), 1);
assert.strictEqual(pokerHand21.compareWith(pokerHand20), -1);
assert.strictEqual(pokerHand21.compareWith(pokerHand22), 1);
assert.strictEqual(pokerHand22.compareWith(pokerHand23), 1);
assert.strictEqual(pokerHand24.compareWith(pokerHand23), -1);
assert.strictEqual(pokerHand24.compareWith(pokerHand25), 1);
assert.strictEqual(pokerHand25.compareWith(pokerHand24), -1);
assert.strictEqual(pokerHand26.compareWith(pokerHand25), -1);
assert.strictEqual(pokerHand25.compareWith(pokerHand26), 1);
assert.strictEqual(pokerHand25.compareWith(pokerHand27), 1);
assert.strictEqual(pokerHand26.compareWith(pokerHand27), 1);
assert.strictEqual(pokerHand27.compareWith(pokerHand22), -1);
assert.strictEqual(pokerHand27.compareWith(pokerHand28), 0);
assert.strictEqual(pokerHand28.compareWith(pokerHand29), 1);
assert.strictEqual(pokerHand28.compareWith(pokerHand27), 0);
assert.strictEqual(pokerHand27.compareWith(pokerHand29), 1);
assert.strictEqual(pokerHand29.compareWith(pokerHand30), 1);
assert.strictEqual(pokerHand31.compareWith(pokerHand30), -1);
assert.strictEqual(pokerHand31.compareWith(pokerHand32), 1);
assert.strictEqual(pokerHand32.compareWith(pokerHand33), 1);
assert.strictEqual(pokerHand33.compareWith(pokerHand34), 1);
assert.strictEqual(pokerHand34.compareWith(pokerHand35), 1);
assert.strictEqual(pokerHand34.compareWith(pokerHand33), -1);
assert.strictEqual(pokerHand35.compareWith(pokerHand36), 1);
assert.strictEqual(pokerHand36.compareWith(pokerHand35), -1);
