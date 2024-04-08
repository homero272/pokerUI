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

const pokerHand37 = new PokerHand([
    new Card('6', 'h'),
    new Card('2', 'h'),
    new Card('5', 'h'),
    new Card('3', 'h'),
    new Card('7', 'h'),
]);

const pokerHand38 = new PokerHand([
    new Card('J', 's'),
    new Card('T', 'h'),
    new Card('A', 'd'),
    new Card('Q', 's'),
    new Card('K', 'c'),
]);

const pokerHand39 = new PokerHand([
    new Card('T', 's'),
    new Card('K', 'c'),
    new Card('Q', 'h'),
    new Card('A', 's'),
    new Card('J', 'c'),
]);

const pokerHand40 = new PokerHand([
    new Card('T', 's'),
    new Card('K', 'c'),
    new Card('Q', 'h'),
    new Card('9', 's'),
    new Card('J', 'c'),
]);

const pokerHand41 = new PokerHand([
    new Card('J', 's'),
    new Card('T', 'h'),
    new Card('9', 'd'),
    new Card('Q', 's'),
    new Card('K', 'c'),
]);

const pokerHand42 = new PokerHand([
    new Card('J', 's'),
    new Card('T', 'h'),
    new Card('9', 'd'),
    new Card('7', 's'),
    new Card('8', 'c'),
]);

const pokerHand43 = new PokerHand([
    new Card('6', 'd'),
    new Card('5', 'c'),
    new Card('9', 'h'),
    new Card('7', 's'),
    new Card('8', 'c'),
]);

const pokerHand44 = new PokerHand([
    new Card('6', 'd'),
    new Card('5', 'c'),
    new Card('8', 'h'),
    new Card('7', 's'),
    new Card('4', 'c'),
]);

const pokerHand45 = new PokerHand([
    new Card('6', 'd'),
    new Card('5', 'c'),
    new Card('3', 'h'),
    new Card('7', 's'),
    new Card('4', 'c'),
]);

const pokerHand46 = new PokerHand([
    new Card('6', 'd'),
    new Card('5', 'c'),
    new Card('3', 'h'),
    new Card('2', 's'),
    new Card('4', 'c'),
]);

const pokerHand47 = new PokerHand([
    new Card('2', 'd'),
    new Card('5', 'c'),
    new Card('3', 'h'),
    new Card('A', 's'),
    new Card('4', 'c'),
]);

const pokerHand48 = new PokerHand([
    new Card('2', 'h'),
    new Card('5', 's'),
    new Card('3', 's'),
    new Card('A', 's'),
    new Card('4', 's'),
]);

const pokerHand49 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('Q', 's'),
    new Card('A', 's'),
    new Card('A', 'h'),
]);

const pokerHand50 = new PokerHand([
    new Card('A', 'd'),
    new Card('A', 's'),
    new Card('A', 'h'),
    new Card('K', 's'),
    new Card('Q', 'h'),
]);

const pokerHand51 = new PokerHand([
    new Card('K', 'd'),
    new Card('A', 's'),
    new Card('A', 'h'),
    new Card('A', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand500 = new PokerHand([
    new Card('A', 'd'),
    new Card('A', 's'),
    new Card('A', 'h'),
    new Card('K', 's'),
    new Card('J', 'h'),
]);

const pokerHand501 = new PokerHand([
    new Card('A', 'd'),
    new Card('A', 's'),
    new Card('A', 'h'),
    new Card('Q', 's'),
    new Card('J', 'h'),
]);

const pokerHand52 = new PokerHand([
    new Card('K', 'd'),
    new Card('K', 's'),
    new Card('A', 'h'),
    new Card('K', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand53 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('K', 'h'),
    new Card('K', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand54 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('Q', 'h'),
    new Card('K', 'c'),
    new Card('K', 'h'),
]);

const pokerHand55 = new PokerHand([
    new Card('J', 'd'),
    new Card('K', 's'),
    new Card('A', 'h'),
    new Card('K', 'c'),
    new Card('K', 'h'),
]);

const pokerHand56 = new PokerHand([
    new Card('T', 'd'),
    new Card('K', 's'),
    new Card('A', 'h'),
    new Card('K', 'c'),
    new Card('K', 'h'),
]);

const pokerHand57 = new PokerHand([
    new Card('7', 'd'),
    new Card('K', 's'),
    new Card('A', 'h'),
    new Card('K', 'c'),
    new Card('K', 'h'),
]);

const pokerHand58 = new PokerHand([
    new Card('3', 'd'),
    new Card('K', 's'),
    new Card('A', 'h'),
    new Card('K', 'c'),
    new Card('K', 'h'),
]);

const pokerHand59 = new PokerHand([
    new Card('2', 'd'),
    new Card('K', 's'),
    new Card('A', 'h'),
    new Card('K', 'c'),
    new Card('K', 'h'),
]);

const pokerHand60 = new PokerHand([
    new Card('T', 'd'),
    new Card('K', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('A', 'h'),
]);

const pokerHand61 = new PokerHand([
    new Card('T', 'd'),
    new Card('Q', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('K', 'h'),
]);

const pokerHand62 = new PokerHand([
    new Card('T', 'd'),
    new Card('Q', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('9', 'h'),
]);

const pokerHand63 = new PokerHand([
    new Card('T', 'd'),
    new Card('Q', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('8', 'h'),
]);

const pokerHand64 = new PokerHand([
    new Card('T', 'd'),
    new Card('J', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('8', 'h'),
]);

const pokerHand65 = new PokerHand([
    new Card('T', 'd'),
    new Card('7', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('8', 'h'),
]);

const pokerHand66 = new PokerHand([
    new Card('T', 'd'),
    new Card('7', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('6', 'h'),
]);

const pokerHand67 = new PokerHand([
    new Card('T', 'd'),
    new Card('5', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('6', 'h'),
]);

const pokerHand68 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('Q', 'h'),
    new Card('A', 'c'),
    new Card('K', 'h'),
]);

const pokerHand69 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('J', 'h'),
    new Card('A', 'c'),
    new Card('K', 'h'),
]);

const pokerHand70 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('3', 'h'),
    new Card('A', 'c'),
    new Card('K', 'h'),
]);

const pokerHand71 = new PokerHand([
    new Card('A', 'd'),
    new Card('K', 's'),
    new Card('2', 'h'),
    new Card('A', 'c'),
    new Card('K', 'h'),
]);

const pokerHand72 = new PokerHand([
    new Card('Q', 'd'),
    new Card('K', 's'),
    new Card('K', 'h'),
    new Card('A', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand73 = new PokerHand([
    new Card('Q', 'd'),
    new Card('K', 's'),
    new Card('K', 'h'),
    new Card('J', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand74 = new PokerHand([
    new Card('Q', 'd'),
    new Card('K', 's'),
    new Card('K', 'h'),
    new Card('T', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand75 = new PokerHand([
    new Card('Q', 'd'),
    new Card('J', 's'),
    new Card('T', 'h'),
    new Card('T', 'c'),
    new Card('Q', 'h'),
]);

const pokerHand76 = new PokerHand([
    new Card('7', 'd'),
    new Card('4', 's'),
    new Card('7', 'h'),
    new Card('T', 'c'),
    new Card('4', 'h'),
]);

const pokerHand77 = new PokerHand([
    new Card('7', 'd'),
    new Card('4', 's'),
    new Card('7', 'h'),
    new Card('9', 'c'),
    new Card('4', 'h'),
]);

const pokerHand78 = new PokerHand([
    new Card('7', 'd'),
    new Card('4', 's'),
    new Card('7', 'h'),
    new Card('6', 'c'),
    new Card('4', 'h'),
]);

const pokerHand79 = new PokerHand([
    new Card('7', 'd'),
    new Card('4', 's'),
    new Card('7', 'h'),
    new Card('5', 'c'),
    new Card('4', 'h'),
]);

const pokerHand80 = new PokerHand([
    new Card('7', 'd'),
    new Card('4', 's'),
    new Card('7', 'h'),
    new Card('3', 'c'),
    new Card('4', 'h'),
]);

const pokerHand81 = new PokerHand([
    new Card('7', 'd'),
    new Card('4', 's'),
    new Card('7', 'h'),
    new Card('2', 'c'),
    new Card('4', 'h'),
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
pokerHand37.print();
pokerHand38.print();
pokerHand39.print();
pokerHand40.print();
pokerHand41.print();
pokerHand42.print();
pokerHand43.print();
pokerHand44.print();
pokerHand45.print();
pokerHand46.print();
pokerHand47.print();
pokerHand48.print();
pokerHand49.print();
pokerHand50.print();
pokerHand51.print();
pokerHand500.print();
pokerHand501.print();
pokerHand52.print();
pokerHand53.print();
pokerHand54.print();
pokerHand55.print();
pokerHand56.print();
pokerHand57.print();
pokerHand58.print();
pokerHand59.print();
pokerHand60.print();
pokerHand61.print();
pokerHand62.print();
pokerHand63.print();
pokerHand64.print();
pokerHand65.print();
pokerHand66.print();
pokerHand67.print();
pokerHand68.print();
pokerHand69.print();
pokerHand70.print();
pokerHand71.print();
pokerHand72.print();
pokerHand73.print();
pokerHand74.print();
pokerHand75.print();
pokerHand76.print();
pokerHand77.print();
pokerHand78.print();
pokerHand79.print();
pokerHand80.print();
pokerHand81.print();

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
assert.strictEqual(pokerHand37.compareWith(pokerHand35), -1);
assert.strictEqual(pokerHand37.compareWith(pokerHand36), -1);
assert.strictEqual(pokerHand35.compareWith(pokerHand37), 1);
assert.strictEqual(pokerHand37.compareWith(pokerHand38), 1);
assert.strictEqual(pokerHand37.compareWith(pokerHand39), 1);
assert.strictEqual(pokerHand39.compareWith(pokerHand38), 0);
assert.strictEqual(pokerHand38.compareWith(pokerHand39), 0);
assert.strictEqual(pokerHand39.compareWith(pokerHand37), -1);
assert.strictEqual(pokerHand38.compareWith(pokerHand36), -1);
assert.strictEqual(pokerHand40.compareWith(pokerHand36), -1);
assert.strictEqual(pokerHand40.compareWith(pokerHand39), -1);
assert.strictEqual(pokerHand40.compareWith(pokerHand41), 0);
assert.strictEqual(pokerHand41.compareWith(pokerHand40), 0);
assert.strictEqual(pokerHand39.compareWith(pokerHand41), 1);
assert.strictEqual(pokerHand38.compareWith(pokerHand40), 1);
assert.strictEqual(pokerHand41.compareWith(pokerHand42), 1);
assert.strictEqual(pokerHand41.compareWith(pokerHand43), 1);
assert.strictEqual(pokerHand41.compareWith(pokerHand44), 1);
assert.strictEqual(pokerHand42.compareWith(pokerHand41), -1);
assert.strictEqual(pokerHand43.compareWith(pokerHand41), -1);
assert.strictEqual(pokerHand42.compareWith(pokerHand43), 1);
assert.strictEqual(pokerHand43.compareWith(pokerHand42), -1);
assert.strictEqual(pokerHand42.compareWith(pokerHand44), 1);
assert.strictEqual(pokerHand42.compareWith(pokerHand45), 1);
assert.strictEqual(pokerHand43.compareWith(pokerHand44), 1);
assert.strictEqual(pokerHand43.compareWith(pokerHand45), 1);
assert.strictEqual(pokerHand45.compareWith(pokerHand44), -1);
assert.strictEqual(pokerHand45.compareWith(pokerHand46), 1);
assert.strictEqual(pokerHand45.compareWith(pokerHand47), 1);
assert.strictEqual(pokerHand47.compareWith(pokerHand46), -1);
assert.strictEqual(pokerHand46.compareWith(pokerHand47), 1);
assert.strictEqual(pokerHand48.compareWith(pokerHand47), 0);
assert.strictEqual(pokerHand47.compareWith(pokerHand48), 0);
assert.strictEqual(pokerHand48.compareWith(pokerHand6), -1);
assert.strictEqual(pokerHand48.compareWith(pokerHand7), -1);
assert.strictEqual(pokerHand48.compareWith(pokerHand46), -1);
assert.strictEqual(pokerHand48.compareWith(pokerHand42), -1);
assert.strictEqual(pokerHand48.compareWith(pokerHand43), -1);
assert.strictEqual(pokerHand47.compareWith(pokerHand41), -1);
assert.strictEqual(pokerHand47.compareWith(pokerHand39), -1);
assert.strictEqual(pokerHand47.compareWith(pokerHand24), -1);
assert.strictEqual(pokerHand47.compareWith(pokerHand16), -1);
assert.strictEqual(pokerHand16.compareWith(pokerHand46), 1);
assert.strictEqual(pokerHand17.compareWith(pokerHand48), 1);
assert.strictEqual(pokerHand36.compareWith(pokerHand48), 1);
assert.strictEqual(pokerHand3.compareWith(pokerHand47), 1);
assert.strictEqual(pokerHand11.compareWith(pokerHand44), 1);
assert.strictEqual(pokerHand19.compareWith(pokerHand23), 1);
assert.strictEqual(pokerHand14.compareWith(pokerHand40), 1);
assert.strictEqual(pokerHand48.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand48.compareWith(pokerHand50), 1);
assert.strictEqual(pokerHand48.compareWith(pokerHand51), 1);
assert.strictEqual(pokerHand51.compareWith(pokerHand48), -1);
assert.strictEqual(pokerHand50.compareWith(pokerHand47), -1);
assert.strictEqual(pokerHand49.compareWith(pokerHand46), -1);
assert.strictEqual(pokerHand49.compareWith(pokerHand50), 0);
assert.strictEqual(pokerHand49.compareWith(pokerHand51), 0);
assert.strictEqual(pokerHand51.compareWith(pokerHand50), 0);
assert.strictEqual(pokerHand51.compareWith(pokerHand49), 0);
assert.strictEqual(pokerHand50.compareWith(pokerHand51), 0);
assert.strictEqual(pokerHand50.compareWith(pokerHand49), 0);
assert.strictEqual(pokerHand49.compareWith(pokerHand20), -1);
assert.strictEqual(pokerHand49.compareWith(pokerHand23), -1);
assert.strictEqual(pokerHand50.compareWith(pokerHand22), -1);
assert.strictEqual(pokerHand49.compareWith(pokerHand21), -1);
assert.strictEqual(pokerHand51.compareWith(pokerHand24), -1);
assert.strictEqual(pokerHand50.compareWith(pokerHand22), -1);
assert.strictEqual(pokerHand50.compareWith(pokerHand20), -1);
assert.strictEqual(pokerHand50.compareWith(pokerHand21), -1);
assert.strictEqual(pokerHand51.compareWith(pokerHand21), -1);
assert.strictEqual(pokerHand51.compareWith(pokerHand22), -1);
assert.strictEqual(pokerHand51.compareWith(pokerHand20), -1);
assert.strictEqual(pokerHand20.compareWith(pokerHand51), 1);
assert.strictEqual(pokerHand20.compareWith(pokerHand21), 1);
assert.strictEqual(pokerHand20.compareWith(pokerHand22), 1);
assert.strictEqual(pokerHand21.compareWith(pokerHand51), 1);
assert.strictEqual(pokerHand22.compareWith(pokerHand51), 1);
assert.strictEqual(pokerHand23.compareWith(pokerHand51), 1);
assert.strictEqual(pokerHand24.compareWith(pokerHand51), 1);
assert.strictEqual(pokerHand20.compareWith(pokerHand50), 1);
assert.strictEqual(pokerHand21.compareWith(pokerHand50), 1);
assert.strictEqual(pokerHand22.compareWith(pokerHand50), 1);
assert.strictEqual(pokerHand23.compareWith(pokerHand50), 1);
assert.strictEqual(pokerHand24.compareWith(pokerHand50), 1);
assert.strictEqual(pokerHand20.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand22.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand21.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand24.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand23.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand25.compareWith(pokerHand49), 1);
assert.strictEqual(pokerHand51.compareWith(pokerHand52), 1);
assert.strictEqual(pokerHand53.compareWith(pokerHand52), 0);
assert.strictEqual(pokerHand54.compareWith(pokerHand52), 0);
assert.strictEqual(pokerHand52.compareWith(pokerHand53), 0);
assert.strictEqual(pokerHand54.compareWith(pokerHand53), 0);
assert.strictEqual(pokerHand500.compareWith(pokerHand50), -1);
assert.strictEqual(pokerHand500.compareWith(pokerHand51), -1);
assert.strictEqual(pokerHand500.compareWith(pokerHand52), 1);
assert.strictEqual(pokerHand501.compareWith(pokerHand500), -1);
assert.strictEqual(pokerHand501.compareWith(pokerHand50), -1);
assert.strictEqual(pokerHand500.compareWith(pokerHand501), 1);
assert.strictEqual(pokerHand500.compareWith(pokerHand52), 1);
assert.strictEqual(pokerHand500.compareWith(pokerHand53), 1);
assert.strictEqual(pokerHand501.compareWith(pokerHand54), 1);
assert.strictEqual(pokerHand54.compareWith(pokerHand55), 1);
assert.strictEqual(pokerHand53.compareWith(pokerHand56), 1);
assert.strictEqual(pokerHand55.compareWith(pokerHand52), -1);
assert.strictEqual(pokerHand56.compareWith(pokerHand53), -1);
assert.strictEqual(pokerHand55.compareWith(pokerHand54), -1);
assert.strictEqual(pokerHand55.compareWith(pokerHand56), 1);
assert.strictEqual(pokerHand55.compareWith(pokerHand57), 1);
assert.strictEqual(pokerHand55.compareWith(pokerHand58), 1);
assert.strictEqual(pokerHand55.compareWith(pokerHand59), 1);
assert.strictEqual(pokerHand59.compareWith(pokerHand56), -1);
assert.strictEqual(pokerHand59.compareWith(pokerHand55), -1);
assert.strictEqual(pokerHand59.compareWith(pokerHand54), -1);
assert.strictEqual(pokerHand58.compareWith(pokerHand57), -1);
assert.strictEqual(pokerHand58.compareWith(pokerHand59), 1);
assert.strictEqual(pokerHand56.compareWith(pokerHand57), 1);
assert.strictEqual(pokerHand56.compareWith(pokerHand59), 1);
assert.strictEqual(pokerHand56.compareWith(pokerHand55), -1);
assert.strictEqual(pokerHand57.compareWith(pokerHand56), -1);
assert.strictEqual(pokerHand59.compareWith(pokerHand58), -1);
assert.strictEqual(pokerHand59.compareWith(pokerHand60), 1);
assert.strictEqual(pokerHand60.compareWith(pokerHand61), 1);
assert.strictEqual(pokerHand62.compareWith(pokerHand61), -1);
assert.strictEqual(pokerHand62.compareWith(pokerHand63), 1);
assert.strictEqual(pokerHand63.compareWith(pokerHand64), 1);
assert.strictEqual(pokerHand65.compareWith(pokerHand64), -1);
assert.strictEqual(pokerHand66.compareWith(pokerHand65), -1);
assert.strictEqual(pokerHand65.compareWith(pokerHand66), 1);
assert.strictEqual(pokerHand66.compareWith(pokerHand67), 1);
assert.strictEqual(pokerHand67.compareWith(pokerHand61), -1);
assert.strictEqual(pokerHand67.compareWith(pokerHand65), -1);
assert.strictEqual(pokerHand67.compareWith(pokerHand68), 1);
assert.strictEqual(pokerHand69.compareWith(pokerHand68), -1);
assert.strictEqual(pokerHand70.compareWith(pokerHand69), -1);
assert.strictEqual(pokerHand68.compareWith(pokerHand70), 1);
assert.strictEqual(pokerHand69.compareWith(pokerHand71), 1);
assert.strictEqual(pokerHand70.compareWith(pokerHand72), 1);
assert.strictEqual(pokerHand73.compareWith(pokerHand72), -1);
assert.strictEqual(pokerHand74.compareWith(pokerHand73), -1);
assert.strictEqual(pokerHand72.compareWith(pokerHand74), 1);
assert.strictEqual(pokerHand75.compareWith(pokerHand76), 1);
assert.strictEqual(pokerHand77.compareWith(pokerHand69), -1);
assert.strictEqual(pokerHand78.compareWith(pokerHand77), -1);
assert.strictEqual(pokerHand77.compareWith(pokerHand74), -1);
assert.strictEqual(pokerHand76.compareWith(pokerHand73), -1);
assert.strictEqual(pokerHand70.compareWith(pokerHand78), 1);
assert.strictEqual(pokerHand78.compareWith(pokerHand76), -1);
assert.strictEqual(pokerHand76.compareWith(pokerHand77), 1);
assert.strictEqual(pokerHand76.compareWith(pokerHand75), -1);
assert.strictEqual(pokerHand78.compareWith(pokerHand79), 1);
assert.strictEqual(pokerHand76.compareWith(pokerHand79), 1);
assert.strictEqual(pokerHand79.compareWith(pokerHand80), 1);
assert.strictEqual(pokerHand81.compareWith(pokerHand80), -1);
assert.strictEqual(pokerHand80.compareWith(pokerHand81), 1);
assert.strictEqual(pokerHand80.compareWith(pokerHand78), -1);
assert.strictEqual(pokerHand81.compareWith(pokerHand74), -1);
assert.strictEqual(pokerHand76.compareWith(pokerHand81), 1);

